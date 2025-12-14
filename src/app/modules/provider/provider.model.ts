import { model, Schema } from 'mongoose';
import { IProvider } from './provider.interface';

const providerSchema = new Schema<IProvider>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    profile_image: { type: String },
    fullName: { type: String, required: true },
    providerTypeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ProviderTypes',
    },
    serviceId: [
      { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    ],

    about: { type: String },
    address: { type: String },
    location: { type: String },

    identificationNumber: { type: String },

    // Doctor-specific
    specialization: { type: String },
    medicalLicenseNumber: { type: String },
    yearsOfExperience: { type: Number },
    languages: [{ type: String }],

    // Pharmacy/Business-specific
    drugLicenseNumber: { type: String },
    businessRegistrationNumber: { type: String },
    licenseExpiryDate: { type: Date },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Provider = model<IProvider>('Provider', providerSchema);
export default Provider;
