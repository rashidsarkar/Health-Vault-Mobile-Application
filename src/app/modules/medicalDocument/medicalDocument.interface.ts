import { Types } from 'mongoose';

export interface IMedicalDocument {
  normalUserId: Types.ObjectId;
  mySelf?: string[];
  deleteMydoc?: string[];
  deleteFamilydoc?: string[];
  family?: string[];
}
