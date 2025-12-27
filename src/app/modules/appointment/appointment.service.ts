import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IAppointment } from './appointment.interface';
import Appointment from './appointment.model';
import Provider from '../provider/provider.model';
import { sendRealTimeNotification } from '../../utils/sendRealTimeNotification';
import getAdminIds from '../../utils/findAllDminIds';

const createAppointment = async (payload: IAppointment, profileId: string) => {
  const isProvider = await Provider.findById(payload.providerId);
  if (!isProvider) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid provider ID');
  }
  if (
    isProvider.serviceId &&
    !isProvider.serviceId.includes(payload.serviceId)
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'The provider does not offer the specified service',
    );
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
      select: 'address providerTypeId',
      populate: {
        path: 'providerTypeId',
        select: 'key',
      },
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

const AppointmentServices = {
  createAppointment,
  getMyAppointments,
  getProviderAppointments,
  getAllAppointments,
};
export default AppointmentServices;
