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
router.delete(
  '/delete-availability-slot',
  auth(USER_ROLE.PROVIDER),
  AvailabilitySlotController.deleteAvailabilitySlot,
);
export const availabilitySlotRoutes = router;
