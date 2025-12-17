import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProviderTypesServices from './providerTypes.service';

const createProviderType = catchAsync(async (req, res) => {
  const result = await ProviderTypesServices.createProviderType(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Provider type created successfully',
    data: result,
  });
});

const getAllProviderTypes = catchAsync(async (req, res) => {
  const result = await ProviderTypesServices.getAllProviderTypes();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Provider types fetched successfully',
    data: result,
  });
});

const getSingleProviderType = catchAsync(async (req, res) => {
  const result = await ProviderTypesServices.getSingleProviderType(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Provider type fetched successfully',
    data: result,
  });
});

const updateProviderType = catchAsync(async (req, res) => {
  const result = await ProviderTypesServices.updateProviderType(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Provider type updated successfully',
    data: result,
  });
});

const deleteProviderType = catchAsync(async (req, res) => {
  const result = await ProviderTypesServices.deleteProviderType(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Provider type deleted successfully',
    data: result,
  });
});

const ProviderTypesController = {
  createProviderType,
  getAllProviderTypes,
  getSingleProviderType,
  updateProviderType,
  deleteProviderType,
};
export default ProviderTypesController;
