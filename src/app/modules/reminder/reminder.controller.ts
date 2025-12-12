import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import reminderServices from './reminder.service';

// const updateUserProfile = catchAsync(async (req, res) => {
//   const { ...profileData } = req.body;
//   const userId = req.params.userId;

//   const updatedProfile = await reminderServices.updateUserProfile(
//     userId,
//     profileData
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User profile updated successfully",
//     data: updatedProfile,
//   });
// });
const createReminder = catchAsync(async (req, res) => {
  const result = await reminderServices.createReminder(req.body, req.profileID);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reminder created successfully',
    data: result,
  });
});

const ReminderController = { createReminder };
export default ReminderController;
