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
    mySelf: {
      type: [String],
    },
    family: {
      type: [String],
    },
  },
  { timestamps: true },
);

const MedicalDocument = model<IMedicalDocument>(
  'MedicalDocument',
  medicalDocumentSchema,
);
export default MedicalDocument;
