import express from 'express';

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

export const normalUserRoutes = router;
