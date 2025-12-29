import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import NormalUserController from './normalUser.controller';

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
//     validateRequest(normalUserValidations.updateNormalUserData),
//     normalUserController.updateUserProfile
// );

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN),
  NormalUserController.getSingleNormalUserProfile,
);

router.get('/', auth(USER_ROLE.ADMIN), NormalUserController.getAllNormalUsers);

export const normalUserRoutes = router;
