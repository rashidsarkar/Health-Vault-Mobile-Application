import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';
import FavoriteController from './favorite.controller';

const router = express.Router();

// router.patch(
//     "/update-profile",
//     auth(USER_ROLE.user),
//     uploadFile(),
//     (req, res, next) => {
//         if (req.body.data) {
//             req.body = JSON.parse(req.body.data);
//         }
//         next();
//     },
//     validateRequest(favoriteValidations.updateFavoriteData),
//     favoriteController.updateUserProfile
// );

router.post(
  '/:providerId',
  auth(USER_ROLE.NORMALUSER),
  FavoriteController.addFavorite,
);

router.delete(
  '/:providerId',
  auth(USER_ROLE.NORMALUSER),
  FavoriteController.removeFavorite,
);

export const favoriteRoutes = router;
