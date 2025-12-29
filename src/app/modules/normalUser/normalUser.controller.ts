import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import normalUserServices from './normalUser.service';

// const updateUserProfile = catchAsync(async (req, res) => {
//   const { files } = req;
//   if (files && typeof files === 'object' && 'profile_image' in files) {
//     req.body.profile_image = files['profile_image'][0].path;
//   }
//   const result = await normalUserServices.updateUserProfile(
//     req.user.profileId,
//     req.body,
//   );
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Profile updated successfully',
//     data: result,
//   });
// });

const getSingleNormalUserProfile = catchAsync(async (req, res) => {
  const result = await normalUserServices.getSingleNormalUserProfile(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile found successfully',
    data: result,
  });
});
const getAllNormalUsers = catchAsync(async (req, res) => {
  const result = await normalUserServices.getAllNormalUsers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profiles found successfully',
    data: result,
  });
});
const NormalUserController = { getSingleNormalUserProfile, getAllNormalUsers };
export default NormalUserController;
