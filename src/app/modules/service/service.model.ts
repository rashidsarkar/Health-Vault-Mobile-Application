import { model, Schema } from 'mongoose';
import { IService } from './service.interface';
import { USER_ROLE } from '../user/user.const';

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    providerId: {
      type: String,
    },
    providerType: {
      type: String,
      enum: Object.values(USER_ROLE), // 🔥 dynamic enum
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Service = model<IService>('Service', serviceSchema);
export default Service;
