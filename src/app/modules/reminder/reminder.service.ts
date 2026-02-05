import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IReminder } from './reminder.interface';
import Reminder from './reminder.model';

const createReminder = async (payload: IReminder, userId: string) => {
  const reminderData = {
    ...payload,
    normalUserId: userId,
  };
  const result = await Reminder.create(reminderData);
  return result;
};

const getMyReminders = async (userId: string) => {
  const reminders = await Reminder.find({ normalUserId: userId });
  return reminders;
};
const updateReminder = async (
  reminderId: string,
  userId: string,
  payload: Partial<IReminder>,
) => {
  const updatedReminder = await Reminder.findById(reminderId);
  if (!updatedReminder) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Reminder not found');
  }
  if (updatedReminder.normalUserId.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this reminder',
    );
  }
  const result = await Reminder.findByIdAndUpdate(reminderId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteReminder = async (reminderId: string, userId: string) => {
  const updatedReminder = await Reminder.findById(reminderId);
  if (!updatedReminder) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Reminder not found');
  }
  if (updatedReminder.normalUserId.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this reminder',
    );
  }
  const result = await Reminder.findByIdAndDelete(reminderId);
  return result;
};

const ReminderServices = {
  createReminder,
  getMyReminders,
  updateReminder,
  deleteReminder,
};
export default ReminderServices;
