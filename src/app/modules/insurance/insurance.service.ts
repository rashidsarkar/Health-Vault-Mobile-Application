import { IInsurance } from './insurance.interface';
import Insurance from './insurance.model';
import { Types } from 'mongoose';

const createInsurance = async (profileId: string, payload: IInsurance) => {
  payload.normalUserId = new Types.ObjectId(profileId);
  const result = await Insurance.create(payload);
  return result;
};

const InsuranceServices = { createInsurance };
export default InsuranceServices;
