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

const AvailabilitySlotServices = { createAvailabilitySlot };
export default AvailabilitySlotServices;
