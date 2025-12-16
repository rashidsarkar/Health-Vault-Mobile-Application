import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';
import AvailabilitySlotValidations from './availabilitySlot.validation';
import AvailabilitySlotController from './availabilitySlot.controller';

const router = express.Router();

router.post(
  '/create-availability-slot',
  auth(USER_ROLE.PROVIDER),
  validateRequest(AvailabilitySlotValidations.createAvailabilitySlot),
  AvailabilitySlotController.createAvailabilitySlot,
);

export const availabilitySlotRoutes = router;
