// healthLog.route.ts
import express from 'express';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import HealthLogValidations from './healthLog.validation';
import HealthLogController from './healthLog.controller';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.NORMALUSER),
  validateRequest(HealthLogValidations.createHealthLog),
  HealthLogController.createHealthLog,
);

router.get(
  '/:forWhom',
  auth(USER_ROLE.NORMALUSER),
  HealthLogController.getMyHealthLogs,
);

router.patch(
  '/:id',
  auth(USER_ROLE.NORMALUSER),
  validateRequest(HealthLogValidations.updateHealthLog),
  HealthLogController.updateHealthLog,
);

router.delete(
  '/:id',
  auth(USER_ROLE.NORMALUSER),
  HealthLogController.deleteHealthLog,
);

export const healthLogRoutes = router;
