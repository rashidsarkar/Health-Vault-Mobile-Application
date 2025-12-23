// healthLog.model.ts
import { Schema, model } from 'mongoose';
import { IHealthLog } from './healthLog.interface';

const healthLogSchema = new Schema<IHealthLog>(
  {
    normalUserId: {
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
      required: true,
    },
    forWhom: {
      type: String,
      enum: ['SELF', 'FAMILY'],
      required: true,
    },
    familyMemberName: {
      type: String,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    heartRate: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    bloodSugar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const HealthLog = model<IHealthLog>('HealthLog', healthLogSchema);
export default HealthLog;
