import { Types } from 'mongoose';

export interface IMedicalDocument {
  normalUserId: Types.ObjectId;
  medical_mySelf_image?: string[];
  medical_family_image?: string[];
  deleteMedical_mySelf_image?: string[];
  deleteMedical_family_image?: string[];
}
