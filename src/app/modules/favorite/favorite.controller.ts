import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FavoriteServices from './favorite.service';

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

const FavoriteController = { addFavorite, removeFavorite };
export default FavoriteController;
