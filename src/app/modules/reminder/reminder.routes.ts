import express from 'express';
import auth from '../../middlewares/auth';
import reminderValidations from './reminder.validation';
import reminderController from './reminder.controller';
import { USER_ROLE } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-reminder',
  auth(USER_ROLE.NORMALUSER),
  validateRequest(reminderValidations.createReminderSchema),
  reminderController.createReminder,
);
router.get(
  '/my-reminders',
  auth(USER_ROLE.NORMALUSER),
  reminderController.getMyReminders,
);
router.patch(
  '/update-reminder/:id',
  auth(USER_ROLE.NORMALUSER),
  validateRequest(reminderValidations.updateReminderSchema),
  reminderController.updateReminder,
);
router.patch(
  '/delete-reminder/:id',
  auth(USER_ROLE.NORMALUSER),
  // validateRequest(reminderValidations.updateReminderSchema),
  reminderController.deleteReminder,
);

export const reminderRoutes = router;
