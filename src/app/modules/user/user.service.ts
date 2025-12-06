import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import NormalUser from '../normalUser/normalUser.model';
import Doctor from '../doctor/doctor.model';
import Clinic from '../clinic/clinic.model';

const createUserIntoDB = async (userData: TUser) => {
  const existingUser = await User.isUserExists(userData.email);

  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'Email is already in use');
  }
  await User.create(userData);
  const result = await User.findOne({ email: userData.email }).select(
    '_id name email',
  );

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [user] = await User.create([userData], { session });
    let profile;
    // create role-based profile
    if (userData.role === 'NORMAlUSER') {
      const normalUserPayload = {
        ...userData,
        userId: user._id,
      };
      const [normalUser] = await NormalUser.create([normalUserPayload], {
        session,
      });
      profile = normalUser;
      await User.findByIdAndUpdate(
        user._id,
        {
          profileId: profile._id,
        },
        { session },
      );
    } else if (userData.role === 'DOCTOR') {
      const doctorPayload = {
        ...userData,
        userId: user._id,
      };
      const [doctor] = await Doctor.create([doctorPayload], { session });
      profile = doctor;
      await User.findByIdAndUpdate(
        user._id,
        {
          profileId: profile._id,
        },
        { session },
      );
    } else if (userData.role === 'CLINIC') {
      const clinicPayload = {
        ...userData,
        userId: user._id,
      };
      const [clinic] = await Clinic.create([clinicPayload], { session });
      profile = clinic;
      await User.findByIdAndUpdate(
        user._id,
        {
          profileId: profile._id,
        },
        { session },
      );
    }
  } catch (error) {}

  return result;
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
