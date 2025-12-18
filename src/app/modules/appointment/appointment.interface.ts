import { Types } from 'mongoose';
export type TAppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';
export interface IAppointment {
  normalUserId: Types.ObjectId;
  providerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  reasonForVisit: string;
  appointmentDateTime: Date;
  appointment_images?: string;

  status: TAppointmentStatus;
}
