import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import ServiceController from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import ServiceValidations from './service.validation';

const router = express.Router();

router.post(
  '/create-service',
  auth(...Object.values(USER_ROLE)),
  validateRequest(ServiceValidations.createServiceData),
  ServiceController.createService,
);
router.get('/admin-service', ServiceController.getAdminServices);
router.get(
  '/my-created-service',
  auth(...Object.values(USER_ROLE)),
  ServiceController.getMyCreatedServices,
);

router.patch(
  '/update-service/:id',
  auth(...Object.values(USER_ROLE)),
  ServiceController.updatedService,
);

export const serviceRoutes = router;
