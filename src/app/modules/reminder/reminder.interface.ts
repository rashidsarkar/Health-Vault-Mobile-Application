/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export enum ReminderSchedule {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export interface IReminder {
  normalUserId: Types.ObjectId;
  pillName: string;
  dosage: number;
  timesPerDay: number;
  schedule: ReminderSchedule; // enum - optional to define later
  times: string[]; // array of time strings (e.g. "08:00")
  startDate: Date;
  endDate: Date;
  instructions: string; // enum if needed
  assignedTo: string;
  isActive: boolean;
}
