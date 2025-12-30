import { z } from 'zod';

export const createServiceData = z.object({
  body: z.object({
    providerId: z.string().nullable().optional(),

    // providerType: z.nativeEnum(USER_ROLE),

    title: z.string().min(1, 'Service type is required'),
    price: z.number().min(0, 'Price must be positive'),
  }),
});

// "title": "General Health Teac",
// "price": 300,
// "providerType":"TEACHER"

const ServiceValidations = { createServiceData };
export default ServiceValidations;
