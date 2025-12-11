import { Types } from 'mongoose';

export interface IDoctor {
  user: Types.ObjectId;
  profile_image: string;
  fullName: string;
  specialization: string;
  identificationNumber: string;
  medicalLicenseNumber: string;
  servicesOffered: string[]; // enum can be applied in Zod or model
  yearsOfExperience: number;
  languages: string[];
  location: string;
  institution: string;
}
