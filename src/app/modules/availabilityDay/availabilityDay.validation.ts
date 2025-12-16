import { z } from 'zod';

export const createAvailabilityDay = z.object({
  body: z.object({
    providerId: z.string().optional(),
    dayOfWeek: z.enum(['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI']),
  }),
});

const AvailabilityDayValidations = { createAvailabilityDay };
export default AvailabilityDayValidations;
