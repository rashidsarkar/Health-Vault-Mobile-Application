// healthLog.validation.ts
import { z } from 'zod';

const createHealthLog = z.object({
  body: z
    .object({
      forWhom: z.enum(['SELF', 'FAMILY']),
      familyMemberName: z.string().optional(),
      bloodPressure: z.string(),
      heartRate: z.string(),
      weight: z.number(),
      bloodSugar: z.string(),
    })
    .refine((data) => data.forWhom === 'SELF' || !!data.familyMemberName, {
      message: 'familyMemberName is required for FAMILY',
    }),
});

const updateHealthLog = z.object({
  body: z.object({
    forWhom: z.enum(['SELF', 'FAMILY']).optional(),
    familyMemberName: z.string().optional(),
    bloodPressure: z.string().optional(),
    heartRate: z.string().optional(),
    weight: z.number().optional(),
    bloodSugar: z.string().optional(),
  }),
});

const HealthLogValidations = {
  createHealthLog,
  updateHealthLog,
};

export default HealthLogValidations;
