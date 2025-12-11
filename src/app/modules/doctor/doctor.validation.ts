import { z } from 'zod';

export const createDoctorSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    profile_image: z.string().optional(),
    fullName: z.string().min(1, 'Full name is required'),
    specialization: z.string().min(1),
    identificationNumber: z.string().min(1),
    medicalLicenseNumber: z.string().min(1),

    servicesOffered: z.array(z.string()), // add enum if needed
    yearsOfExperience: z.number().min(0),

    languages: z.array(z.string()).optional(),
    location: z.string().min(1),
    institution: z.string().min(1),
  }),
});

const DoctorValidations = { createDoctorSchema };
export default DoctorValidations;
