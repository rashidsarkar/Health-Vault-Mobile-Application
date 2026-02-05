import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import reminderServices from './reminder.service';

const createReminder = catchAsync(async (req, res) => {
  const result = await reminderServices.createReminder(
    req.body,
    req.user.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reminder created successfully',
    data: result,
  });
});
const getMyReminders = catchAsync(async (req, res) => {
  const result = await reminderServices.getMyReminders(req.user.profileId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reminders fetched successfully',
    data: result,
  });
});
const updateReminder = catchAsync(async (req, res) => {
  const reminderId = req.params.id;
  const result = await reminderServices.updateReminder(
    reminderId,
    req.user.profileId,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reminder updated successfully',
    data: result,
  });
});
const deleteReminder = catchAsync(async (req, res) => {
  const reminderId = req.params.id;
  const result = await reminderServices.deleteReminder(
    reminderId,
    req.user.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reminder Delete successfully',
    data: result,
  });
});

const ReminderController = {
  createReminder,
  getMyReminders,
  updateReminder,
  deleteReminder,
};
export default ReminderController;
