import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import reminderValidations from './reminder.validation';
import reminderController from './reminder.controller';
import { uploadFile } from '../../helper/fileUploader';

const router = express.Router();

router.post(
  '/create-reminder',
  auth(USER_ROLE.NORMAL_USER),
  validateRequest(reminderValidations.createReminderSchema),
  reminderController.createReminder,
);

export const reminderRoutes = router;
