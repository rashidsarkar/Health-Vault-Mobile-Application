import { z } from 'zod';

/* ---------------- Doctor Schema ---------------- */
const doctorSchema = z
  .object({
    body: z.object({
      user: z.string().optional(),
      providerTypeId: z.string(),

      providerTypeString: z.literal('DOCTOR'), // discriminator
      fullName: z.string(),
      email: z.string().email(),
      password: z.string(),
      phone: z.string(),
      role: z.string(),
      specialization: z.string(),
      identificationNumber: z.string(),
      medicalLicenseNumber: z.string(),
      serviceId: z.array(z.string()),
      yearsOfExperience: z.number(),
      yearsOfExperience2: z.number().optional(),
      languages: z.array(z.string()),
      address: z.string(),

      about: z.string(),
      isVerified: z.boolean().optional(),
      isActive: z.boolean().optional(),
      playerId: z.string().optional(),
    }),
  })
  .strict();

/* ---------------- Other Provider Schema ---------------- */
const otherProviderSchema = z
  .object({
    body: z.object({
      user: z.string().optional(),
      providerTypeId: z.string(),

      providerTypeString: z.literal('OTHER'), // discriminator
      fullName: z.string(),
      email: z.string().email(),
      password: z.string(),
      phone: z.string(),
      role: z.string(),
      displayName: z.string(),

      businessRegistrationNumber: z.string(),
      serviceId: z.array(z.string()),
      drugLicenseNumber: z.string(),
      address: z.string(),

      about: z.string(),
      isVerified: z.boolean().optional(),
      isActive: z.boolean().optional(),
      playerId: z.string().optional(),
    }),
  })
  .strict();

/* ---------------- Discriminated Union ---------------- */
export const createProviderSchema = z.discriminatedUnion('providerTypeString', [
  doctorSchema.shape.body, // use .shape.body because the union expects the object itself
  otherProviderSchema.shape.body,
]);

/* ---------------- Usage Example ---------------- */
// const examplePayload = {
//   fullName: 'Doctor',
//   email: 'fawtwrmeail@yopmail.com',
//   password: '123456',
//   phone: '016683962845',
//   role: 'PROVIDER',
//   providerTypeId: '693e86542a9201212e6ffb64',
//   providerTypeString: 'DOCTOR',
//   specialization: 'General Medicine',
//   identificationNumber: 'NID-1234567890',
//   medicalLicenseNumber: 'BMDC-987654',
//   serviceId: ['693e86102a9201212e6ffb5a'],
//   yearsOfExperience: 8,
//   languages: ['Bangla', 'English'],
//   address: 'House 12, Road 5, Dhanmondi',
//   about: 'Experienced re services.',
// };
// const examplePayload = {
//   fullName: 'Doctor',
//   email: 'fawtwrmeail@yopmail.com',
//   password: '123456',
//   phone: '016683962845',
//   role: 'PROVIDER',
//   providerTypeId: '693e86542a9201212e6ffb64',
//   providerTypeString: 'OTHER',

//   displayName: 'MedCare 24/7',
//   businessRegistrationNumber: 'BRN-5001928374',
//   serviceId: ['693e86102a9201212e6ffb5a'],
//   drugLicenseNumber: 'DLN-X9Y8Z7W6V5',
//   address: '456 Oak Stre, City',
//   about: 'Certified 2al supplies.',
// };

// const parsed = createProviderSchema.parse(examplePayload); // ✅ works
// console.log(parsed);

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
    playerId: z.string().optional(),
  }),
});

const ProviderValidations = { updateProviderData, createProviderSchema };
export default ProviderValidations;
