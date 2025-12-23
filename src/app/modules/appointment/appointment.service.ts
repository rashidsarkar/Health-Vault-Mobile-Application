import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IAppointment } from './appointment.interface';
import Appointment from './appointment.model';
import Provider from '../provider/provider.model';
import Notification from '../notification/notification.model';

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

  await Notification.create({
    title: 'New Appointment',
    message: `You have a new appointment `,
    receiver: payload.providerId,
  });
  await Notification.create({
    title: 'New Appointment',
    message: `You have a new appointment `,
    receiver: 'all',
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

const AppointmentServices = { createAppointment, getMyAppointments };
export default AppointmentServices;
