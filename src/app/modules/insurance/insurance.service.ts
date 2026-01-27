import { StatusCodes } from 'http-status-codes';
import { IInsurance, TForWhom } from './insurance.interface';
import Insurance from './insurance.model';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import unlinkFile from '../../utils/unLinkFile';

const createInsurance = async (profileId: string, payload: IInsurance) => {
  payload.normalUserId = new Types.ObjectId(profileId);
  const result = await Insurance.create(payload);
  return result;
};

const updateInsurance = async (
  id: string,
  profileId: string,
  payload: Partial<IInsurance>,
) => {
  // 🔍 Find existing insurance first
  const existingInsurance = await Insurance.findOne({
    _id: id,
    normalUserId: profileId,
  });

  if (!existingInsurance) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Insurance not found');
  }

  // 🗑️ Remove old photo if new one is uploaded
  if (existingInsurance.insurance_Photo && payload.insurance_Photo) {
    unlinkFile(existingInsurance.insurance_Photo);
  }

  // ✏️ Update insurance
  const result = await Insurance.findOneAndUpdate(
    { _id: id, normalUserId: profileId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deleteInsurance = async (id: string, profileId: string) => {
  const log = await Insurance.findOneAndDelete({
    _id: id,
    normalUserId: profileId,
  });

  if (!log) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Insurance  not found');
  }
};

const getMyInsurances = async (profileId: string, forWhom: TForWhom) => {
  const result = await Insurance.find({ normalUserId: profileId, forWhom });
  if (!result || result.length === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'No insurances found or fixed SELF FAMILY',
    );
  }

  return result;
};

const InsuranceServices = {
  createInsurance,
  updateInsurance,
  deleteInsurance,
  getMyInsurances,
};
export default InsuranceServices;
