import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import { uploadFile } from '../../utils/fileUploader';
import AppointmentValidations from './appointment.validation';
import validateRequest from '../../middlewares/validateRequest';
import AppointmentController from './appointment.controller';

const router = express.Router();

router.post(
  '/create-appointment',
  auth(USER_ROLE.NORMALUSER),
  uploadFile(),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(AppointmentValidations.createAppointmentData),
  AppointmentController.createAppointment,
);
router.get(
  '/my-appointments',
  auth(USER_ROLE.NORMALUSER),
  AppointmentController.getMyAppointments,
);

router.get(
  '/provider-appointments',
  auth(USER_ROLE.PROVIDER),
  AppointmentController.getProviderAppointments,
);

router.get(
  '/all-appointments',
  auth(USER_ROLE.ADMIN),
  AppointmentController.getAllAppointments,
);

export const appointmentRoutes = router;
