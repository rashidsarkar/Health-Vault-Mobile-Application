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

const ReminderServices = { createReminder };
export default ReminderServices;
