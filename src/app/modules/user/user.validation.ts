import { z } from 'zod';
import { USER_ROLE } from './user.const';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(100, 'Name is too long'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.nativeEnum(USER_ROLE),
    phone: z.string().trim(),
  }),
});

export const UserValidation = {
  registerUserValidationSchema,
};
