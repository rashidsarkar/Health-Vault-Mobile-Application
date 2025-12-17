import { IService } from './service.interface';
import Service from './service.model';
import { USER_ROLE } from '../user/user.const';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createService = async (
  payload: IService,
  providerId: string | null,
  providerType: string,
  myRole?: string,
) => {
  if (myRole === USER_ROLE.ADMIN) {
    const result = await Service.create({
      ...payload,
      isAdminCreated: true,
      providerType: providerType,
    });
    return result;
  }
  const result = await Service.create({
    ...payload,
    providerId: providerId,
  });
  return result;
};

const getAdminServices = async (providerType: string) => {
  const services = await Service.find({
    providerType: providerType,
    providerId: null,
  });
  return services;
};

const getMyCreatedServices = async (
  profileId: string,
  providerType: string,
) => {
  const services = await Service.find({
    providerType: providerType,
    providerId: profileId,
  });
  return services;
};

const ServiceServices = {
  createService,
  getAdminServices,
  getMyCreatedServices,
};
export default ServiceServices;
