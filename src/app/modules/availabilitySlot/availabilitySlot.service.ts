import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import AvailabilityDay from '../availabilityDay/availabilityDay.model';
import { IAvailabilitySlot } from './availabilitySlot.interface';
import AvailabilitySlot from './availabilitySlot.model';

const createAvailabilitySlot = async (
  payload: IAvailabilitySlot,
  profileId: string,
) => {
  const isMyAvailabilityDay = await AvailabilityDay.findOne({
    _id: payload.availabilityDayId,
    providerId: profileId,
  });

  if (!isMyAvailabilityDay) {
    throw new Error('Unauthorized to add slot to this availability day');
  }

  const existingSlot = await AvailabilitySlot.findOne({
    availabilityDayId: payload.availabilityDayId,
    startTime: payload.startTime,
  });

  if (existingSlot) {
    throw new Error('Availability slot already exists for this day and time');
  }

  payload.availabilityDayId = isMyAvailabilityDay._id;

  await AvailabilityDay.findByIdAndUpdate(
    isMyAvailabilityDay._id,
    {
      $push: {
        availabilitySlots: payload,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return await AvailabilitySlot.create(payload);
};

const deleteAvailabilitySlot = async (
  availabilityDayId: string,
  profileId: string,
  availabilitySlotId: string,
) => {
  const availabilityDay = await AvailabilityDay.findOne({
    _id: availabilityDayId,
    providerId: profileId,
  });

  if (!availabilityDay) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Unauthorized to delete this slot',
    );
  }
  const result = await AvailabilitySlot.findOneAndDelete(
    {
      _id: availabilitySlotId,
      availabilityDayId: availabilityDay._id,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    // throw new Error('Availability slot not found')
    throw new AppError(StatusCodes.NOT_FOUND, 'Availability slot not found');
  }
  return result;
  //   return await AvailabilitySlot.findOneAndDelete({
  //     _id: availabilitySlotId,
  //     availabilityDayId:profileId
  //   });
};

const AvailabilitySlotServices = {
  createAvailabilitySlot,
  deleteAvailabilitySlot,
};
export default AvailabilitySlotServices;
