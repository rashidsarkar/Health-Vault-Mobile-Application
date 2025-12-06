import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import NormalUser from '../normalUser/normalUser.model';
import Doctor from '../doctor/doctor.model';
import Clinic from '../clinic/clinic.model';
import Pharmacy from '../pharmacy/pharmacy.model';

const createUserIntoDB = async (userData: TUser) => {
  const existingUser = await User.isUserExists(userData.email);

  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'Email is already in use');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create main user
    const [user] = await User.create([userData], { session });

    let profileModel;

    switch (userData.role) {
      case 'NORMALUSER':
        profileModel = NormalUser;
        break;
      case 'DOCTOR':
        profileModel = Doctor;
        break;
      case 'CLINIC':
        profileModel = Clinic;
        break;
      case 'PHARMACY':
        profileModel = Pharmacy;
        break;
      default:
        throw new Error('Invalid user role');
    }

    // Create role-based profile
    const payload = {
      ...userData,
      userId: user._id,
    };

    const [profile] = await profileModel.create([payload], { session });

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
