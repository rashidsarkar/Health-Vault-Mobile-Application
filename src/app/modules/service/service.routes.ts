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

export const serviceRoutes = router;
