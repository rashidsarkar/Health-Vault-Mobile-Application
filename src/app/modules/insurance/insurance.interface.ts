// insurance.interface.ts
import { Types } from 'mongoose';

export type TForWhom = 'SELF' | 'FAMILY';

export interface IInsurance {
  normalUserId: Types.ObjectId;
  forWhom: TForWhom;
  name: string;
  number: string;
  insuranceProvider: string;
  expiryDate: Date;
  insurance_Photo?: string;
}
