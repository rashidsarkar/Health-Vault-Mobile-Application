import express from 'express';
import { USER_ROLE } from '../user/user.const';
import ProviderTypesValidations from './providerTypes.validation';
import ProviderTypesController from './providerTypes.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(ProviderTypesValidations.createProviderType),
  ProviderTypesController.createProviderType,
);

router.get('/', ProviderTypesController.getAllProviderTypes);

router.get('/:id', ProviderTypesController.getSingleProviderType);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(ProviderTypesValidations.updateProviderType),
  ProviderTypesController.updateProviderType,
);

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  ProviderTypesController.deleteProviderType,
);

export const providerTypesRoutes = router;
