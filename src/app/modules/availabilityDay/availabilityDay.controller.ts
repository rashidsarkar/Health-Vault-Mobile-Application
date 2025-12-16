import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AvailabilityDayServices from './availabilityDay.service';

const createAvailabilityDay = catchAsync(async (req, res) => {
  const result = await AvailabilityDayServices.createAvailabilityDay(req.body,req.user.profileId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Availability day created',
    data: result,
  });
});

const AvailabilityDayController = { createAvailabilityDay };
export default AvailabilityDayController;
