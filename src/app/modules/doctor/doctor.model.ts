import { model, Schema } from 'mongoose';
import { IDoctor } from './doctor.interface';

const doctorSchema = new Schema<IDoctor>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profile_image: { type: String },
    fullName: { type: String },
    specialization: { type: String, required: true },
    identificationNumber: { type: String, required: true },
    medicalLicenseNumber: { type: String, required: true },
    servicesOffered: { type: [String], default: [] },
    yearsOfExperience: { type: Number, required: true },
    languages: { type: [String], default: [] },
    location: { type: String, required: true },
    institution: { type: String, required: true },
    about: { type: String, required: true },
  },
  { timestamps: true },
);

const Doctor = model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
