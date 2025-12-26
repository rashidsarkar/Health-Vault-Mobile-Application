import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FavoriteServices from './favorite.service';
import { sendRealTimeNotification } from '../../utils/sendRealTimeNotification';

const addFavorite = catchAsync(async (req, res) => {
  const { providerId } = req.params;
  const result = await FavoriteServices.addFavorite(
    providerId,
    req.user.profileId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Added to favorites',
    data: result,
  });
});

const myFavorites = catchAsync(async (req, res) => {
  const result = await FavoriteServices.myFavorites(req.user.profileId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Favorites fetched successfully',
    data: result,
  });
});

const removeFavorite = catchAsync(async (req, res) => {
  const { providerId } = req.params;

  const result = await FavoriteServices.removeFavorite(
    providerId,
    req.user.profileId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Removed from favorites',
    data: result,
  });
});
const testNoti = catchAsync(async (req, res) => {
  const result = await sendRealTimeNotification({
    receivers: ['693fef5afc65410271ac7c86'],
    title: 'Group Notification',
    message: 'Message for everyone',
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Removed from favorites',
    data: result,
  });
});

const FavoriteController = {
  addFavorite,
  removeFavorite,
  myFavorites,
  testNoti,
};
export default FavoriteController;
