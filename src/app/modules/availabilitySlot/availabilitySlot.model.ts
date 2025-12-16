import { model, Schema } from 'mongoose';
import { IAvailabilitySlot } from './availabilitySlot.interface';

const availabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    availabilityDayId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AvailabilityDay',
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true },
);

const AvailabilitySlot = model<IAvailabilitySlot>(
  'AvailabilitySlot',
  availabilitySlotSchema,
);
export default AvailabilitySlot;
