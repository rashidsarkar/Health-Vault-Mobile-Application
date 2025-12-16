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

const AvailabilityDayServices = { createAvailabilityDay };
export default AvailabilityDayServices;
