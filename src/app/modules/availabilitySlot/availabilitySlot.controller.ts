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

const deleteAvailabilitySlot = catchAsync(async (req, res) => {
  const { availabilityDayId, availabilitySlotId } = req.body;
  const result = await availabilitySlotServices.deleteAvailabilitySlot(
    availabilityDayId,
    req.user.profileId,
    availabilitySlotId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Availability slot deleted',
    data: result,
  });
});

const AvailabilitySlotController = {
  createAvailabilitySlot,
  deleteAvailabilitySlot,
};
export default AvailabilitySlotController;
