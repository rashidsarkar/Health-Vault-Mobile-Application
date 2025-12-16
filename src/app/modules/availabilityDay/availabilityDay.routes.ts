import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';
import AvailabilityDayValidations from './availabilityDay.validation';
import AvailabilityDayController from './availabilityDay.controller';

const router = express.Router();

router.post(
  '/create-availability-day',
  auth(USER_ROLE.PROVIDER),
  validateRequest(AvailabilityDayValidations.createAvailabilityDay),
  AvailabilityDayController.createAvailabilityDay,
);

export const availabilityDayRoutes = router;
