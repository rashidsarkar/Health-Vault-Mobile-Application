import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import InsuranceServices from './insurance.service';
import { TForWhom } from './insurance.interface';

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

const updateInsurance = catchAsync(async (req, res) => {
  const { files } = req;

  if (files && typeof files === 'object' && 'insurance_Photo' in files) {
    req.body.insurance_Photo = files['insurance_Photo'][0].path;
  }

  const result = await InsuranceServices.updateInsurance(
    req.params.id,
    req.user.profileId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Insurance updated successfully',
    data: result,
  });
});

const deleteInsurance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InsuranceServices.deleteInsurance(
    id,
    req.user.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Insurance deleted successfully',
    data: result,
  });
});

const getMyInsurances = catchAsync(async (req, res) => {
  const result = await InsuranceServices.getMyInsurances(
    req.user.profileId,
    req.params.forWhom as TForWhom,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Insurances fetched successfully',
    data: result,
  });
});
const InsuranceController = {
  createInsurance,
  updateInsurance,
  deleteInsurance,
  getMyInsurances,
};
export default InsuranceController;
