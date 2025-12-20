import { StatusCodes } from 'http-status-codes';
import medicalDocumentServices from './medicalDocument.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createUserMedicalDocument = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'medical_mySelf_image' in files) {
    // req.body.medical_mySelf_image = files['medical_mySelf_image'][0].path;

    req.body.medical_mySelf_image = files['medical_mySelf_image'].map(
      (file) => `${file.path}`,
    );
  }
  if (files && typeof files === 'object' && 'medical_family_image' in files) {
    // req.body.medical_family_image = files['medical_family_image'][0].path;
    req.body.medical_family_image = files['medical_family_image'].map(
      (file) => `${file.path}`,
    );
  }

  //   if (files && typeof files === 'object' && 'article_images' in files) {
  //     // req.body.profile_image = files['thumbnail_image'][0].path;
  //     req.body.article_images = files['article_images'].map(
  //       (file) => `${file.path}`,
  //     );
  //   }

  const result = await medicalDocumentServices.createUserMedicalDocument(
    req.user.profileId,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Created user medical document successfully',
    data: result,
  });
});
const updateUserMedicalDocument = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'medical_mySelf_image' in files) {
    // req.body.medical_mySelf_image = files['medical_mySelf_image'][0].path;

    req.body.medical_mySelf_image = files['medical_mySelf_image'].map(
      (file) => `${file.path}`,
    );
  }
  if (files && typeof files === 'object' && 'medical_family_image' in files) {
    // req.body.medical_family_image = files['medical_family_image'][0].path;
    req.body.medical_family_image = files['medical_family_image'].map(
      (file) => `${file.path}`,
    );
  }
  const result = await medicalDocumentServices.updateUserMedicalDocument(
    req.user.profileId,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Updated user medical document successfully',
    data: result,
  });
});

const MedicalDocumentController = {
  createUserMedicalDocument,
  updateUserMedicalDocument,
};
export default MedicalDocumentController;
