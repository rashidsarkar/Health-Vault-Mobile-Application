import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import availabilitySlotServices from './availabilitySlot.service';

const createAvailabilitySlot = catchAsync(async (req, res) => {
  const result = await availabilitySlotServices.createAvailabilitySlot(
    req.body,
    req.user.profileId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Availability slot created',
    data: result,
  });
});

const AvailabilitySlotController = { createAvailabilitySlot };
export default AvailabilitySlotController;
