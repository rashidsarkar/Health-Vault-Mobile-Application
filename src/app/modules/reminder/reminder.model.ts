import { model, Schema } from 'mongoose';
import { IReminder, ReminderSchedule } from './reminder.interface';

const reminderSchema = new Schema<IReminder>(
  {
    normalUserId: {
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
      required: true,
    },

    pillName: { type: String, required: true },
    dosage: { type: Number, required: true },
    timesPerDay: { type: Number, required: true },

    schedule: {
      type: String,
      enum: Object.values(ReminderSchedule),
      required: true,
    },

    times: {
      type: [String], // ["08:00", "14:30"]
      required: true,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    instructions: { type: String, required: true },
    assignedTo: { type: String, required: true },

    isActive: { type: Boolean, default: true },
    lastNotifiedAt: { type: Date },
  },
  { timestamps: true },
);

const Reminder = model<IReminder>('Reminder', reminderSchema);
export default Reminder;
