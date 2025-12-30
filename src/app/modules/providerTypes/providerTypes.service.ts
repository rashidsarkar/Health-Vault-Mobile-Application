import { StatusCodes } from 'http-status-codes';
import { IProviderTypes } from './providerTypes.interface';
import ProviderTypes from './providerTypes.model';
import AppError from '../../errors/AppError';

const createProviderType = async (payload: IProviderTypes) => {
  const exists = await ProviderTypes.findOne({ key: payload.key });
  if (exists) {
    throw new AppError(StatusCodes.CONFLICT, 'Provider type already exists');
  }
  return await ProviderTypes.create(payload);
};

const getAllProviderTypes = async () => {
  return await ProviderTypes.find();
};

const getSingleProviderType = async (id: string) => {
  const result = await ProviderTypes.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Provider type not found');
  }
  return result;
};

const updateProviderType = async (
  id: string,
  payload: Partial<IProviderTypes>,
) => {
  const result = await ProviderTypes.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Provider type not found');
  }
  return result;
};

const deleteProviderType = async (id: string) => {
  const result = await ProviderTypes.findByIdAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    {
      isActive: false,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Provider type not found');
  }
  return result;
};

export default {
  createProviderType,
  getAllProviderTypes,
  getSingleProviderType,
  updateProviderType,
  deleteProviderType,
};
