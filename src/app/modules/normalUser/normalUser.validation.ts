import { z } from 'zod';

export const updateNormalUserData = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    profilePhoto: z.string().optional(),
    fullName: z.string().min(1, 'Full name is required'),
    dateOfBirth: z.string().datetime({ message: 'Invalid date' }),
    gender: z.enum(['MALE', 'FEMALE']),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    membershipId: z.string(),
    address: z.string(),
    emergencyContact: z.number(),
    identificationNumber: z.string(),
  }),
});

const NormalUserValidations = { updateNormalUserData };
export default NormalUserValidations;
