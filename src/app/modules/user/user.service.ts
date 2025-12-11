import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import NormalUser from '../normalUser/normalUser.model';
import Doctor from '../doctor/doctor.model';
import Clinic from '../clinic/clinic.model';
import Pharmacy from '../pharmacy/pharmacy.model';
import { USER_ROLE } from './user.const';
import DiagnosticCenter from '../diagnosticCenter/diagnosticCenter.model';
import MedicalTourism from '../medicalTourism/medicalTourism.model';
import PlasticSurgery from '../plasticSurgery/plasticSurgery.model';
import InVitroFertilization from '../inVitroFertilization/inVitroFertilization.model';
import Wellness from '../wellness/wellness.model';
import { z } from 'zod';
import { createNormalUserData } from '../normalUser/normalUser.validation';

const createUserIntoDB = async (userData: TUser) => {
  console.log(userData);
  const existingUser = await User.isUserExists(userData.email);

  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'Email is already in use');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create main user
    const user = await User.create([userData], { session }).then(
      (res) => res[0],
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let profileModel: any;

    switch (userData.role) {
      case USER_ROLE.NORMALUSER:
        profileModel = NormalUser;
        createNormalUserData.parse({ body: { ...userData } });
        break;
      case USER_ROLE.DOCTOR:
        profileModel = Doctor;
        break;
      case USER_ROLE.CLINIC:
        profileModel = Clinic;
        break;
      case USER_ROLE.PHARMACY:
        profileModel = Pharmacy;
        break;
      case USER_ROLE.DIAGNOSTIC_CENTER:
        profileModel = DiagnosticCenter;
        break;
      case USER_ROLE.MEDICAL_TOURISM:
        profileModel = MedicalTourism;
        break;
      case USER_ROLE.PLASTIC_SURGERY:
        profileModel = PlasticSurgery;
        break;
      case USER_ROLE.IN_VITRO_FERTILIZATION:
        profileModel = InVitroFertilization;
        break;
      case USER_ROLE.WELLNESS:
        profileModel = Wellness;
        break;

      default:
        throw new Error('Invalid user role');
    }

    // Create role-based profile
    const payload = {
      ...userData,
      user: user._id,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile] = await (profileModel as any).create([payload], {
      session,
    });

    // update user
    await User.findByIdAndUpdate(
      user._id,
      { profileId: profile._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    // return final user
    const result = await User.findById(user._id).select(
      '_id name email role profileId',
    );

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getUserFromDb = async () => {
  const user = await User.find().select('_id name email role');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

export const UserServices = {
  createUserIntoDB,

  getUserFromDb,
};
