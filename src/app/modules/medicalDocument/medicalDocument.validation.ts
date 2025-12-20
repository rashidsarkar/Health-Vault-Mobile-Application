import { z } from 'zod';

export const medicalDocumentValidationSchema = z.object({
  normalUserId: z.string({
    required_error: 'Normal user ID is required',
  }),

  mySelf: z.array(z.string()).optional(),

  family: z.array(z.string()).optional(),

  deleteMydoc: z.array(z.string()).optional(),

  deleteFamilydoc: z.array(z.string()).optional(),
});

const MedicalDocumentValidations = { medicalDocumentValidationSchema };
export default MedicalDocumentValidations;
