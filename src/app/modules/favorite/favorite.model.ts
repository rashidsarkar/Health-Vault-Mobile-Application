import { model, Schema } from 'mongoose';
import { IFavorite } from './favorite.interface';

const favoriteSchema = new Schema<IFavorite>(
  {
    normalUserId: { type: Schema.Types.ObjectId, ref: 'NormalUser' },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
  },
  { timestamps: true },
);
favoriteSchema.index({ normalUserId: 1, providerId: 1 }, { unique: true });

const Favorite = model<IFavorite>('Favorite', favoriteSchema);
export default Favorite;
