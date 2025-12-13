import { z } from 'zod';
import { USER_ROLE } from '../user/user.const';

export const createServiceData = z.object({
  body: z.object({
    providerId: z.string().nullable().optional(),

    providerType: z.nativeEnum(USER_ROLE).nullable().optional(),

    type: z.string().min(1, 'Service type is required'),
    price: z.number().min(0, 'Price must be positive'),
  }),
});

const ServiceValidations = { createServiceData };
export default ServiceValidations;
