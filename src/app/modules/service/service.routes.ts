import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import ServiceController from './service.controller';

const router = express.Router();

router.post(
  '/create-service',
  auth(...Object.values(USER_ROLE)),
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
