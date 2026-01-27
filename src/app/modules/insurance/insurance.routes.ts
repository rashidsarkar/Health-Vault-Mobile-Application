// insurance.route.ts
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import InsuranceValidations from './insurance.validation';
import InsuranceController from './insurance.controller';
import { USER_ROLE } from '../user/user.const';
import { uploadFile } from '../../utils/fileUploader';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.NORMALUSER),
  uploadFile(),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(InsuranceValidations.createInsurance),
  InsuranceController.createInsurance,
);

// router.get(
//   '/',
//   auth(USER_ROLE.NORMALUSER),
//   InsuranceController.getMyInsurances,
// );

router.patch(
  '/:id',
  auth(USER_ROLE.NORMALUSER),
  uploadFile(),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(InsuranceValidations.updateInsurance),
  InsuranceController.updateInsurance,
);

router.delete(
  '/:id',
  auth(USER_ROLE.NORMALUSER),
  InsuranceController.deleteInsurance,
);

router.get(
  '/:forWhom',
  auth(USER_ROLE.NORMALUSER),
  InsuranceController.getMyInsurances,
);

export const insuranceRoutes = router;
