import { Types } from 'mongoose';

export interface IProvider {
  user: Types.ObjectId;
  providerTypeId: Types.ObjectId;
  serviceId: Types.ObjectId[];
  profile_image?: string;
  displayName?: string;

  fullName: string;
  about?: string;
  address?: string;
  location?: string;

  identificationNumber?: string;
  identification_images: string;

  // Doctor-specific
  specialization?: string;
  medicalLicenseNumber?: string;
  yearsOfExperience?: number;
  languages?: string[];

  // Pharmacy/Business-specific
  drugLicenseNumber?: string;
  businessRegistrationNumber?: string;
  licenseExpiryDate?: Date;

  isVerified?: boolean;
  isActive?: boolean;
}
