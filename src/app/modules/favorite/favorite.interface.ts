import { Types } from 'mongoose';

export interface IFavorite {
  normalUserId: Types.ObjectId;
  providerId: Types.ObjectId;
}
