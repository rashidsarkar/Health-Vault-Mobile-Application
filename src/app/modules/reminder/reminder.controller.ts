import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import reminderServices from './reminder.service';

const createReminder = catchAsync(async (req, res) => {
  const result = await reminderServices.createReminder(
    req.body,
    req.user.profileID,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reminder created successfully',
    data: result,
  });
});

const ReminderController = { createReminder };
export default ReminderController;
