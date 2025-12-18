import { model, Schema } from 'mongoose';
import { IAppointment } from './appointment.interface';

const appointmentSchema = new Schema<IAppointment>(
  {
    normalUserId: {
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    reasonForVisit: {
      type: String,
      required: true,
      trim: true,
    },
    appointmentDateTime: {
      type: Date,
      required: true,
    },
    appointment_images: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
  },
  { timestamps: true },
);

const Appointment = model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;
