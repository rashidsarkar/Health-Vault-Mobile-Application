import { Types } from 'mongoose';

export interface IAvailabilitySlot {
  availabilityDayId: Types.ObjectId;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}
