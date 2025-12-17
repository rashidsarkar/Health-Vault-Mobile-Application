import { z } from 'zod';

export const createAvailabilitySlot = z.object({
  body: z.object({
    availabilityDayId: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const AvailabilitySlotValidations = { createAvailabilitySlot };
export default AvailabilitySlotValidations;
