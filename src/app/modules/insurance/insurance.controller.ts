import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import InsuranceServices from './insurance.service';

const createInsurance = catchAsync(async (req, res) => {
  const { files } = req;

  //   if (files && typeof files === 'object' && 'insurance_Photo' in files) {
  //     // req.body.medical_mySelf_image = files['medical_mySelf_image'][0].path;

  //     req.body.insurance_Photo = files['insurance_Photo'].map(
  //       (file) => `${file.path}`,
  //     );
  //   }

  if (files && typeof files === 'object' && 'insurance_Photo' in files) {
    req.body.insurance_Photo = files['insurance_Photo'][0].path;
  }

  const result = await InsuranceServices.createInsurance(
    req.user.profileId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Insurance created successfully',
    data: result,
  });
});

// const updateInsurance = catchAsync(async (req, res) => {
//   const { files } = req;
//   const { deleteInsurancePhoto } = req.body;

//   if (deleteInsurancePhoto) {
//     unlinkFile(deleteInsurancePhoto);
//     req.body.insurance_Photo = undefined;
//   }

//   if (files && typeof files === 'object' && 'insurance_Photo' in files) {
//     req.body.insurance_Photo = files['insurance_Photo'][0].path;
//   }

//   const result = await InsuranceServices.updateInsurance(
//     req.params.id,
//     req.user.profileId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Insurance updated successfully',
//     data: result,
//   });
// });

const InsuranceController = { createInsurance };
export default InsuranceController;
