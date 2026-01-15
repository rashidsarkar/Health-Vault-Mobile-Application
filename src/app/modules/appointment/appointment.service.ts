import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IAppointment } from './appointment.interface';
import Appointment from './appointment.model';
import Provider from '../provider/provider.model';
import { sendRealTimeNotification } from '../../utils/sendRealTimeNotification';
import getAdminIds from '../../utils/findAllDminIds';
import Service from '../service/service.model';
import { IService } from '../service/service.interface';

const createAppointment = async (payload: IAppointment, profileId: string) => {
  const isProvider = await Provider.findById(payload.providerId);
  if (!isProvider) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid provider ID');
  }

  const isValidService = await Service.findOne({
    $or: [{ providerId: payload.providerId }, { isAdminCreated: true }],
    _id: payload.serviceId,
  });
  if (!isValidService) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'The provider does not offer the specified service',
    );
  }

  // if (
  //   payload.serviceId &&
  //   !isProvider.serviceId.some((id) =>
  //     id.equals(new mongoose.Types.ObjectId(payload.serviceId)),
  //   )
  // ) {
  //   throw new AppError(
  //     StatusCodes.BAD_REQUEST,
  //     'The provider does not offer the specified service',
  //   );
  // }

  const isDeletedService: IService | null = await Service.findById(
    payload.serviceId,
  );
  if (!isDeletedService) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid service ID');
  }
  if (isDeletedService.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Service is not active');
  }

  const existingAppointment = await Appointment.findOne({
    normalUserId: profileId,
    providerId: payload.providerId,
    status: {
      $in: ['PENDING', 'CONFIRMED'],
    },
  });
  if (existingAppointment) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'You already have an appointment with this provider',
    );
  }

  const result = await Appointment.create({
    ...payload,
    normalUserId: profileId,
  });

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create appointment');
  }
  // await Notification.insertMany(notifications);
  //             // send push notifications in batch
  //             await sendBatchPushNotification(userIds, title, message, {
  //                 eventId: result._id,
  //                 status: result.status,
  //             });

  // await Notification.create({
  //   title: 'New Appointment',
  //   message: `You have a new appointment `,
  //   receiver: payload.providerId,
  // });
  // await Notification.create({
  //   title: 'New Appointment',
  //   message: `You have a new appointment `,
  //   receiver: 'all',
  // });
  // // io.to(user.profileId.toString()).emit('notifications', notificationCount);
  // const count = await getNotificationCount(payload.providerId);

  // await sendSinglePushNotification(
  //   payload.providerId.toString() as string,
  //   'New Appointment',
  //   'You have a new appointment',
  // );

  // await sendRealTimeNotification({
  //   receivers: [payload.providerId.toString(), 'admin'],
  //   title: 'Group Notification',
  //   message: 'Message for everyone',
  // });

  const adminIds = await getAdminIds();
  await sendRealTimeNotification({
    receivers: [`${result.providerId}`, ...adminIds],
    title: 'New Appointment Request Created',
    message: 'You have a new appointment request',
  });

  const createAppointment = await result.populate(
    'providerId normalUserId serviceId',
  );
  return createAppointment;
};

const getMyAppointments = async (profileId: string) => {
  const appointments = await Appointment.find({
    normalUserId: profileId,
    status: { $in: ['PENDING', 'CONFIRMED'] },
  })
    .populate('providerId normalUserId serviceId')
    .sort({ appointmentDateTime: -1 });
  return appointments;
};

const getProviderAppointments = async (
  providerId: string,
  query: Record<string, unknown>,
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    providerId,
    status: { $in: ['PENDING', 'CONFIRMED'] },
  };

  // 🔢 Total count
  const total = await Appointment.countDocuments(filter);
  const totalPage = Math.ceil(total / limit);

  // 📄 Paginated data
  const appointments = await Appointment.find(filter)
    .populate({
      path: 'normalUserId',
      select: 'fullName profile_image',
    })
    .populate({
      path: 'serviceId',
      select: 'title price',
    })
    .populate({
      path: 'providerId',
      select: 'address',
    })
    .sort({ appointmentDateTime: -1 })
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: appointments,
  };
};

const getAllAppointments = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    status: { $in: ['PENDING', 'CONFIRMED'] },
  };

  const total = await Appointment.countDocuments(filter);
  const totalPage = Math.ceil(total / limit);

  const appointments = await Appointment.aggregate([
    { $match: filter },

    // 🔹 Normal User
    {
      $lookup: {
        from: 'normalusers',
        localField: 'normalUserId',
        foreignField: '_id',
        as: 'normalUser',
      },
    },
    { $unwind: { path: '$normalUser', preserveNullAndEmptyArrays: true } },

    // 🔹 User (email, phone) via profileId
    {
      $addFields: {
        normalUserIdStr: { $toString: '$normalUserId' },
      },
    },

    {
      $lookup: {
        from: 'users',
        localField: 'normalUserIdStr',
        foreignField: 'profileId',
        as: 'normalUserUser',
      },
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },

    // 🔹 Service
    {
      $lookup: {
        from: 'services',
        localField: 'serviceId',
        foreignField: '_id',
        as: 'service',
      },
    },
    { $unwind: { path: '$service', preserveNullAndEmptyArrays: true } },

    // 🔹 Provider
    {
      $lookup: {
        from: 'providers',
        localField: 'providerId',
        foreignField: '_id',
        as: 'provider',
      },
    },

    { $unwind: { path: '$provider', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        providerUserIdStr: { $toString: '$providerId' },
      },
    },

    {
      $lookup: {
        from: 'users',
        localField: 'providerUserIdStr',
        foreignField: 'profileId',
        as: 'providerUserUser',
      },
    },

    // 🔹 Provider Type
    {
      $lookup: {
        from: 'providertypes',
        localField: 'provider.providerTypeId',
        foreignField: '_id',
        as: 'providerType',
      },
    },
    { $unwind: { path: '$providerType', preserveNullAndEmptyArrays: true } },

    // 🔹 Projection
    {
      $project: {
        status: 1,
        appointmentDateTime: 1,
        reasonForVisit: 1,
        appointment_images: 1,
        createdAt: 1,
        normalUser: {
          fullName: '$normalUser.fullName',
          profile_image: '$normalUser.profile_image',
          email: '$normalUserUser.email',
          phone: '$normalUserUser.phone',
          _id: '$normalUser._id',
        },

        service: {
          title: '$service.title',
          price: '$service.price',
        },

        provider: {
          fullName: '$provider.fullName',
          address: '$provider.address',
          providerTypeKey: '$providerType.key',
          email: '$providerUserUser.email',
          phone: '$providerUserUser.phone',
          _id: '$provider._id',
        },
      },
    },

    { $sort: { appointmentDateTime: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: appointments,
  };
};

const deleteAppointment = async (id: string) => {
  const result = await Appointment.findByIdAndDelete(id);
  return result;
};
const updateStatusAppointment = async (id: string, status: string) => {
  const result = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  return result;
};

const AppointmentServices = {
  createAppointment,
  getMyAppointments,
  getProviderAppointments,
  getAllAppointments,
  deleteAppointment,
  updateStatusAppointment,
};
export default AppointmentServices;
