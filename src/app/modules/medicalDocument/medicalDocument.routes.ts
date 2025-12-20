import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import medicalDocumentValidations from './medicalDocument.validation';
import medicalDocumentController from './medicalDocument.controller';
import { USER_ROLE } from '../user/user.const';
import { uploadFile } from '../../utils/fileUploader';

const router = express.Router();

router.post(
  '/create-document',
  auth(USER_ROLE.NORMALUSER),
  uploadFile(),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(medicalDocumentValidations.medicalDocumentValidationSchema),
  medicalDocumentController.createUserMedicalDocument,
);
router.patch(
  '/update-document',
  auth(USER_ROLE.NORMALUSER),
  uploadFile(),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(medicalDocumentValidations.medicalDocumentValidationSchema),
  medicalDocumentController.updateUserMedicalDocument,
);

export const medicalDocumentRoutes = router;
