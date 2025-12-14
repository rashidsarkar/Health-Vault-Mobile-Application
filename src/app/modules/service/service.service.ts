import { IService } from './service.interface';
import Service from './service.model';
import { USER_ROLE } from '../user/user.const';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createService = async (
  payload: IService,
  providerId: string | null,
  providerType: string,
) => {
  let myType;
  if (providerType === USER_ROLE.ADMIN) {
    const result = await Service.create({
      ...payload,
      providerId: null,
      providerType: payload.providerType,
    });
    return result;
  }
  switch (providerType) {
    case USER_ROLE.DOCTOR:
      myType = USER_ROLE.DOCTOR;
      break;
    case USER_ROLE.CLINIC:
      myType = USER_ROLE.CLINIC;
      break;
    case USER_ROLE.PHARMACY:
      myType = USER_ROLE.PHARMACY;
      break;
    case USER_ROLE.DIAGNOSTIC_CENTER:
      myType = USER_ROLE.DIAGNOSTIC_CENTER;
      break;
    case USER_ROLE.MEDICAL_TOURISM:
      myType = USER_ROLE.MEDICAL_TOURISM;
      break;
    case USER_ROLE.PLASTIC_SURGERY:
      myType = USER_ROLE.PLASTIC_SURGERY;
      break;
    case USER_ROLE.IN_VITRO_FERTILIZATION:
      myType = USER_ROLE.IN_VITRO_FERTILIZATION;
      break;
    case USER_ROLE.WELLNESS:
      myType = USER_ROLE.WELLNESS;
      break;
    default:
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid provider type');
  }
  const result = await Service.create({
    ...payload,
    providerId: providerId,
    providerType: myType,
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

const getMyCreatedServices= async(profileId:string,providerType:string)=>{
    const services = await Service.find({
        providerType: providerType,
        providerId: profileId,
      });
      return services;
}


const ServiceServices = { createService, getAdminServices,getMyCreatedServices };
export default ServiceServices;
