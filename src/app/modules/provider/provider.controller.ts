import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import providerServices from './provider.service';

const getAllProviders = catchAsync(async (req, res) => {
  const result = await providerServices.getAllProviders(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Providers fetched successfully',
    data: result,
  });
});

const getSingleProvider = catchAsync(async (req, res) => {
  const result = await providerServices.getSingleProvider(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Provider fetched successfully',
    data: result,
  });
});

const ProviderController = { getAllProviders, getSingleProvider };
export default ProviderController;
