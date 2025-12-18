import { z } from 'zod';

export const createAppointmentData = z.object({
  body: z.object({
    providerId: z.string(),
    serviceId: z.string(),
    reasonForVisit: z.string(),
    appointmentDateTime: z.string(),
    appointment_images: z.string().optional(),
    status: z
      .enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'])
      .optional(),
  }),
});

const AppointmentValidations = { createAppointmentData };
export default AppointmentValidations;
