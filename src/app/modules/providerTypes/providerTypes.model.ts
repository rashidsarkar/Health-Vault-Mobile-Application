import { model, Schema } from 'mongoose';
import { IProviderTypes } from './providerTypes.interface';

const providerTypesSchema = new Schema<IProviderTypes>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // DOCTOR, PHARMACY
      trim: true,
    },
    label: {
      type: String,
      required: true, // Doctor, Pharmacy
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const ProviderTypes = model<IProviderTypes>(
  'ProviderTypes',
  providerTypesSchema,
);

export default ProviderTypes;
