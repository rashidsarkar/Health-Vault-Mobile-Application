import { model, Schema } from 'mongoose';
import { IMedicalDocument } from './medicalDocument.interface';

const medicalDocumentSchema = new Schema<IMedicalDocument>(
  {
    normalUserId: {
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
      required: true,
      unique: true, // one document collection per user
    },
    medical_mySelf_image: {
      type: [String],
      default: [],
    },
    medical_family_image: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const MedicalDocument = model<IMedicalDocument>(
  'MedicalDocument',
  medicalDocumentSchema,
);
export default MedicalDocument;
