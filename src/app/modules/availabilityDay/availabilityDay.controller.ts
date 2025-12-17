import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AvailabilityDayServices from './availabilityDay.service';

const createAvailabilityDay = catchAsync(async (req, res) => {
  const result = await AvailabilityDayServices.createAvailabilityDay(
    req.body,
    req.user.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Availability day created',
    data: result,
  });
});
const getMyAvailabilityDays = catchAsync(async (req, res) => {
  const result = await AvailabilityDayServices.getMyAvailabilityDays(
    req.user.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Availability days fetched successfully',
    data: result,
  });
});

const getProviderAvailability = catchAsync(async (req, res) => {
  const result = await AvailabilityDayServices.getProviderAvailability(
    req.params.providerId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Availability days fetched successfully',
    data: result,
  });
});

const AvailabilityDayController = {
  createAvailabilityDay,
  getMyAvailabilityDays,
  getProviderAvailability,
};
export default AvailabilityDayController;
