import { model, Schema } from 'mongoose';
import { IDoctor } from './doctor.interface';

const doctorSchema = new Schema<IDoctor>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profile_image: { type: String },
    fullName: { type: String },
    specialization: { type: String },
    identificationNumber: { type: String },
    medicalLicenseNumber: { type: String },
    service: { type: [Schema.Types.ObjectId], ref: 'Service', default: [] },
    yearsOfExperience: { type: Number },
    languages: { type: [String], default: [] },
    location: { type: String },
    institution: { type: String },
    about: { type: String },
  },
  { timestamps: true },
);

const Doctor = model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
