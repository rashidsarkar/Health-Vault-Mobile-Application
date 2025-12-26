import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import FavoriteController from './favorite.controller';
import { sendRealTimeNotification } from '../../utils/sendRealTimeNotification';

const router = express.Router();

router.post(
  '/:providerId',
  auth(USER_ROLE.NORMALUSER),
  FavoriteController.addFavorite,
);
router.get(
  '/my-favorites',
  auth(USER_ROLE.NORMALUSER),
  FavoriteController.myFavorites,
);
router.delete(
  '/:providerId',
  auth(USER_ROLE.NORMALUSER),
  FavoriteController.removeFavorite,
);

router.put('/test', FavoriteController.testNoti);

export const favoriteRoutes = router;
