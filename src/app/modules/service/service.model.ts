import { model, Schema } from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new Schema<IService>(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
    },
    providerType: {
      type: String,
      required: true,
    },
    isAdminCreated: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
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
