import { IService } from './service.interface';
import Service from './service.model';
import { USER_ROLE } from '../user/user.const';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import ProviderTypes from '../providerTypes/providerTypes.model';

const createService = async (
  payload: IService,
  providerId: string | null,
  providerType: string,
  myRole?: string,
) => {
  const isValidProviderType = await ProviderTypes.findOne({
    key: providerType,
  });
  if (!isValidProviderType) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid provider type');
  }

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
  const { title, price } = payload;
  const result = await Service.findOneAndUpdate(
    { providerId: profileId, _id: id },
    {
      title,
      price,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found');
  }
  return result;
};

const deleteService = async (id: string) => {
  const result = await Service.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  return result;
};

const ServiceServices = {
  createService,
  getAdminServices,
  getMyCreatedServices,
  updatedService,
  deleteService,
};
export default ServiceServices;
