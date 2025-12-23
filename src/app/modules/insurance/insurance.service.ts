import { IInsurance } from './insurance.interface';
import Insurance from './insurance.model';

const createInsurance = async (profileId: string, payload: IInsurance) => {
  payload.normalUserId = profileId as any;
  return await Insurance.create(payload);
};

const InsuranceServices = { createInsurance };
export default InsuranceServices;
