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

const updateStatusAppointment = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
  }),
});

const AppointmentValidations = {
  createAppointmentData,
  updateStatusAppointment,
};
export default AppointmentValidations;
