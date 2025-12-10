import { model, Schema } from 'mongoose';
import { INormalUser } from './normalUser.interface';

const normalUserSchema = new Schema<INormalUser>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    profilePhoto: { type: String },
    fullName: { type: String },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    membershipId: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    identificationNumber: { type: String },
  },
  { timestamps: true },
);

const NormalUser = model<INormalUser>('NormalUser', normalUserSchema);
export default NormalUser;
