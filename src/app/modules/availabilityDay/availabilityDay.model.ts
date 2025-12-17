import { model, Schema } from 'mongoose';
import { IAvailabilityDay } from './availabilityDay.interface';

const availabilityDaySchema = new Schema<IAvailabilityDay>(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Provider',
    },
    dayOfWeek: {
      type: String,
      enum: ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
      required: true,
    },
  },
  { timestamps: true },
);

const AvailabilityDay = model<IAvailabilityDay>(
  'AvailabilityDay',
  availabilityDaySchema,
);
export default AvailabilityDay;
