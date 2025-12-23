import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ServiceServices from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createService(
    req.body,
    req?.user?.profileId,
    req.body.providerType,
    req.user.role,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAdminServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAdminServices(req.body.providerType);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin services fetched successfully',
    data: result,
  });
});

const getMyCreatedServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getMyCreatedServices(
    req?.user?.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My created services fetched successfully',
    data: result,
  });
});

const updatedService = catchAsync(async (req, res) => {
  const result = await ServiceServices.updatedService(
    req.params.id,
    req?.user?.profileId,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const ServiceController = {
  createService,
  getAdminServices,
  getMyCreatedServices,
  updatedService,
};
export default ServiceController;
