// insurance.validation.ts
import { z } from 'zod';

const createInsurance = z.object({
  body: z.object({
    forWhom: z.enum(['SELF', 'FAMILY']),
    name: z.string(),
    number: z.string(),
    insuranceProvider: z.string(),
    expiryDate: z.string().or(z.date()),
  }),
});

const updateInsurance = z.object({
  body: z.object({
    forWhom: z.enum(['SELF', 'FAMILY']).optional(),
    name: z.string().optional(),
    number: z.string().optional(),
    insuranceProvider: z.string().optional(),
    expiryDate: z.string().or(z.date()).optional(),
    deleteInsurancePhoto: z.string().optional(),
  }),
});

const InsuranceValidations = {
  createInsurance,
  updateInsurance,
};

export default InsuranceValidations;
