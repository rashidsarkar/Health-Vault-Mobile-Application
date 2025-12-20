import { z } from 'zod';

export const medicalDocumentValidationSchema = z.object({
  normalUserId: z.string().optional(),

  medical_mySelf_image: z.array(z.string()).optional(),

  medical_family_image: z.array(z.string()).optional(),

  deleteMedical_mySelf_image: z.array(z.string()).optional(),

  deleteMedical_family_image: z.array(z.string()).optional(),
});

const MedicalDocumentValidations = { medicalDocumentValidationSchema };
export default MedicalDocumentValidations;
