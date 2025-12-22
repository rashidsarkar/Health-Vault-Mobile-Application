// healthLog.controller.ts

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import HealthLogServices from './healthLog.service';

const createHealthLog = catchAsync(async (req, res) => {
  const result = await HealthLogServices.createHealthLog(
    req.user.profileId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Health log created successfully',
    data: result,
  });
});

const getMyHealthLogs = catchAsync(async (req, res) => {
  const result = await HealthLogServices.getMyHealthLogs(req.user.profileId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Health logs fetched successfully',
    data: result,
  });
});

const updateHealthLog = catchAsync(async (req, res) => {
  const result = await HealthLogServices.updateHealthLog(
    req.params.id,
    req.user.profileId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Health log updated successfully',
    data: result,
  });
});

const deleteHealthLog = catchAsync(async (req, res) => {
  await HealthLogServices.deleteHealthLog(req.params.id, req.user.profileId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Health log deleted successfully',
    data: null,
  });
});

const HealthLogController = {
  createHealthLog,
  getMyHealthLogs,
  updateHealthLog,
  deleteHealthLog,
};

export default HealthLogController;
