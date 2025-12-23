// healthLog.interface.ts
import { Types } from 'mongoose';

export type TForWhom = 'SELF' | 'FAMILY';

export interface IHealthLog {
  normalUserId: Types.ObjectId;
  forWhom: TForWhom;
  familyMemberName?: string;
  bloodPressure: string;
  heartRate: string;
  weight: number;
  bloodSugar: string;
}
