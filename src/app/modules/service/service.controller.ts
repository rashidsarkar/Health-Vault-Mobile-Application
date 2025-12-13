import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ServiceServices from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createService(
    req.body,
    req?.user?.profileId,
    req.user.role,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const ServiceController = { createService };
export default ServiceController;
