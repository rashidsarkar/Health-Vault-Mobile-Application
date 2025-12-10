import express, { NextFunction, Request, Response } from 'express';

import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';
import { uploadFile } from '../../utils/fileUploader';

const router = express.Router();
router.post(
  '/register',
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(UserValidation.registerUserValidationSchema),
  UserControllers.createUser,
);

//TODO -  removed this code after test
router.get('/getAllUser', auth(USER_ROLE.ADMIN), UserControllers.getUsers);
export const UserRoutes = router;
// todo
