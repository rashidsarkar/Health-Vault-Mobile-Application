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
    isActive: true,
  });
  if (!isValidProviderType) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid provider type or inactive',
    );
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
    isAdminCreated: true,
    isDeleted: false,
    providerType,
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
  role: string,
) => {
  const { title, price } = payload;
  if (role === USER_ROLE.ADMIN) {
    const result = await Service.findByIdAndUpdate(id, payload);
    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Service not found');
    }
    return result;
  }
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

const deleteService = async (id: string, profileId: string, role: string) => {
  if (role === USER_ROLE.ADMIN) {
    const result = await Service.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  } else if (role === USER_ROLE.PROVIDER) {
    const result = await Service.findOneAndUpdate(
      {
        _id: id,
        providerId: profileId,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!result) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Service not found or unauthorized',
      );
    }
    return result;
  }
  throw new AppError(
    StatusCodes.UNAUTHORIZED,
    'Unauthorized to delete this service',
  );
};

const getServiceByProviderType = async (
  providerType: string,
  query: Record<string, unknown>,
) => {
  // 1️⃣ Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // 2️⃣ Filter
  const filter = { providerType };

  // 3️⃣ Total count
  const total = await Service.countDocuments(filter);
  const totalPage = Math.ceil(total / limit);

  // 4️⃣ Get paginated services
  const services = await Service.find(filter).skip(skip).limit(limit);

  if (services.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Services not found');
  }

  // 5️⃣ Return response
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: services,
  };
};

const ServiceServices = {
  createService,
  getAdminServices,
  getMyCreatedServices,
  updatedService,
  deleteService,
  getServiceByProviderType,
};
export default ServiceServices;
