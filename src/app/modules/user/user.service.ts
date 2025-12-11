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
import { createNormalUserData } from '../normalUser/normalUser.validation';
import { emailSender } from '../../utils/emailSender';
import { createDoctorSchema } from '../doctor/doctor.validation';

const generateVerifyCode = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

const createUserIntoDB = async (userData: TUser) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser?.isVerifyEmailOTPVerified === true) {
    throw new AppError(StatusCodes.CONFLICT, 'Email is already in use');
  }
  // Case 2: User exists but not verified - resend OTP
  if (existingUser && existingUser.isVerifyEmailOTPVerified === false) {
    const otp = generateVerifyCode().toString();
    const verifyEmailOTPExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update OTP and expiry
    const updatedUser = await User.findOneAndUpdate(
      { email: userData.email },
      {
        verifyEmailOTP: otp,
        verifyEmailOTPExpire,
      },
      { new: true, runValidators: true },
    );

    // Send verification email (not password reset email)
    await emailSender(
      userData.email,
      `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Email Verification OTP</h2>
        <p>Thank you for registering. Please use the following OTP to verify your email address:</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <h1 style="color: #2c3e50; margin: 0;">${otp}</h1>
        </div>
        <p><strong>This OTP is valid for 10 minutes only.</strong></p>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply.</p>
      </div>
      `,
    );

    // Return user details so they can proceed to verify
    return {
      message: 'New OTP sent to your email. Please verify to continue.',
      user: {
        _id: updatedUser?._id,
        email: updatedUser?.email,
        isVerifyEmailOTPVerified: updatedUser?.isVerifyEmailOTPVerified,
      },
      resendOTP: true,
    };
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create main user
    const otp = generateVerifyCode().toString();
    const verifyEmailOTPExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const userPayload = {
      ...userData,
      verifyEmailOTP: otp,
      verifyEmailOTPExpire,
    };
    const user = await User.create([userPayload], {
      session,
    }).then((res) => res[0]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let profileModel: any;

    switch (userData.role) {
      case USER_ROLE.NORMALUSER:
        profileModel = NormalUser;
        createNormalUserData.parse({ body: { ...userData } });
        break;
      case USER_ROLE.DOCTOR:
        profileModel = Doctor;
        createDoctorSchema.parse({ body: { ...userData } });
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
      '_id name email role profileId isBlocked isVerifyEmailOTPVerified',
    );
    await emailSender(
      userData.email,
      `
    <h2>Your password reset OTP</h2>
    <h1>${otp}</h1>
    <p>This OTP is valid for 10 minutes only.</p>
    `,
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
