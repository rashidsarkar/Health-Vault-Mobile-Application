/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface INormalUser {
  user: Types.ObjectId;
  profilePhoto: string;
  fullName: string;
  dateOfBirth: Date;
  gender: Gender;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  membershipId: string;
  address: string;
  emergencyContact: string;
  identificationNumber: string;
}
