import { z } from 'zod';

export const createProviderData = z.object({
  body: z.object({
    user: z.string().optional(),
    providerTypeId: z.string(),
    about: z.string().optional(),
    address: z.string().optional(),
    location: z.string().optional(),
    identificationNumber: z.string().optional(),

    specialization: z.string().optional(),
    medicalLicenseNumber: z.string().optional(),
    yearsOfExperience: z.number().optional(),
    languages: z.array(z.string()).optional(),

    drugLicenseNumber: z.string().optional(),
    businessRegistrationNumber: z.string().optional(),
    licenseExpiryDate: z.string().optional(),

    isVerified: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateProviderData = z.object({
  body: z.object({
    displayName: z.string().optional(),
    profileImage: z.string().optional(),
    about: z.string().optional(),
    address: z.string().optional(),
    location: z.string().optional(),
    identificationNumber: z.string().optional(),

    specialization: z.string().optional(),
    medicalLicenseNumber: z.string().optional(),
    yearsOfExperience: z.number().optional(),
    languages: z.array(z.string()).optional(),

    drugLicenseNumber: z.string().optional(),
    businessRegistrationNumber: z.string().optional(),
    licenseExpiryDate: z.string().optional(),

    isVerified: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});

const ProviderValidations = { createProviderData, updateProviderData };
export default ProviderValidations;
