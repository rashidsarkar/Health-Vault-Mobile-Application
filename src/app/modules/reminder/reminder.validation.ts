import { z } from 'zod';
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const createReminderSchema = z.object({
  body: z.object({
    pillName: z.string().min(1),
    dosage: z.number().min(1),
    timesPerDay: z.number().min(1),

    schedule: z.enum(['Daily', 'Weekly', 'Monthly']),

    times: z
      .array(z.string().regex(timeRegex, 'Invalid time format (HH:MM)'))
      .min(1, 'At least one time is required'),

    startDate: z.string().date(),
    endDate: z.string().date(),

    instructions: z.string().min(1),
    assignedTo: z.string().min(1),

    isActive: z.boolean().optional(),
  }),
});
export const updateReminderSchema = z.object({
  body: z.object({
    pillName: z.string().optional(),
    dosage: z.number().optional(),
    timesPerDay: z.number().optional(),

    schedule: z.enum(['Daily', 'Weekly', 'Monthly']).optional(),

    times: z
      .array(z.string().regex(timeRegex, 'Invalid time format (HH:MM)'))
      .optional(),

    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),

    instructions: z.string().optional(),
    assignedTo: z.string().optional(),

    isActive: z.boolean().optional(),
  }),
});

const ReminderValidations = { createReminderSchema, updateReminderSchema };
export default ReminderValidations;
