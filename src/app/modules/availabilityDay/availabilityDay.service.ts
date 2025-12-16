import AvailabilitySlot from '../availabilitySlot/availabilitySlot.model';
import { IAvailabilityDay } from './availabilityDay.interface';
import AvailabilityDay from './availabilityDay.model';

const createAvailabilityDay = async (
  payload: IAvailabilityDay,
  profileId: string,
) => {
  const existingDay = await AvailabilityDay.findOne({
    providerId: profileId,
    dayOfWeek: payload.dayOfWeek,
  });

  if (existingDay) {
    throw new Error('Availability day already exists for this provider');
  }
  const createPayload = { ...payload, providerId: profileId };

  const result = (await AvailabilityDay.create(createPayload)).populate(
    'providerId',
  );
  return result;
};
const getMyAvailabilityDays = async (profileId: string) => {
  const availabilityDays = await AvailabilityDay.find({
    providerId: profileId,
  }).populate('providerId');
  return availabilityDays;
};

const getProviderAvailability = async (providerId: string) => {
  return await AvailabilitySlot.find({ providerId }).populate(
    'availabilityDayId',
  );
};

const AvailabilityDayServices = {
  createAvailabilityDay,
  getMyAvailabilityDays,
  getProviderAvailability,
};
export default AvailabilityDayServices;
