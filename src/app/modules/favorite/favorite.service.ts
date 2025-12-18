import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Favorite from './favorite.model';

const addFavorite = async (providerId: string, profileId: string) => {
  const exists = await Favorite.findOne({
    normalUserId: profileId,
    providerId: providerId,
  });
  if (exists) {
    throw new Error('Favorite already exists');
  }
  const result = await Favorite.create({
    normalUserId: profileId,
    providerId: providerId,
  });
  return result.populate('providerId');
};

const myFavorites = async (profileId: string) => {
  const favorites = await Favorite.find({ normalUserId: profileId }).populate(
    'providerId',
  );
  return favorites;
};

const removeFavorite = async (providerId: string, profileId: string) => {
  const deleted = await Favorite.findOneAndDelete({
    normalUserId: profileId,
    providerId: providerId,
  });

  if (!deleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Favorite not found');
  }

  return deleted;
};

const FavoriteServices = { addFavorite, removeFavorite, myFavorites };
export default FavoriteServices;
