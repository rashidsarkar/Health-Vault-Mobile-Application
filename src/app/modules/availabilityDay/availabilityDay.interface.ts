import { Types } from 'mongoose';

export interface IAvailabilityDay {
  providerId: Types.ObjectId;
  dayOfWeek: 'SAT' | 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
}
