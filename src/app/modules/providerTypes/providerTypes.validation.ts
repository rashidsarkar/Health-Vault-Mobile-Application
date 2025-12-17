import { z } from 'zod';

const createProviderType = z.object({
  body: z.object({
    key: z.string().toUpperCase().trim(),
    label: z.string(),
  }),
});

const updateProviderType = z.object({
  body: z.object({
    label: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const ProviderTypesValidations = { createProviderType, updateProviderType };
export default ProviderTypesValidations;
