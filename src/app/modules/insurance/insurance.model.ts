import { model, Schema } from 'mongoose';
import { IInsurance } from './insurance.interface';

const insuranceSchema = new Schema<IInsurance>(
  {
    normalUserId: {
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
      required: true,
    },
    forWhom: {
      type: String,
      enum: ['SELF', 'FAMILY'],
      required: true,
    },
    name: { type: String, required: true },
    number: { type: String, required: true },
    insuranceProvider: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    insurance_Photo: { type: String },
  },
  { timestamps: true },
);

const Insurance = model<IInsurance>('Insurance', insuranceSchema);
export default Insurance;
