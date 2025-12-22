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

const getMyCreatedServices = async (profileId: string) => {
  const services = await Service.find({
    providerId: profileId,
  });

  return services;
};

const updatedService = async (
  id: string,
  profileId: string,
  payload: IService,
) => {
  const result = await Service.findOneAndUpdate(
    { providerId: profileId, _id: id },
    payload,
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found');
  }
  return result;
};

const ServiceServices = {
  createService,
  getAdminServices,
  getMyCreatedServices,
  updatedService,
};
export default ServiceServices;
