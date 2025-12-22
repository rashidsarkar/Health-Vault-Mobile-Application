import HealthLog from './healthLog.model';
import { IHealthLog } from './healthLog.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createHealthLog = async (profileId: string, payload: IHealthLog) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload.normalUserId = profileId as any;
  return await HealthLog.create(payload);
};

const getMyHealthLogs = async (profileId: string) => {
  return await HealthLog.find({ normalUserId: profileId }).sort({
    createdAt: -1,
  });
};

const updateHealthLog = async (
  id: string,
  profileId: string,
  payload: Partial<IHealthLog>,
) => {
  const log = await HealthLog.findOne({
    _id: id,
    normalUserId: profileId,
  });

  if (!log) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Health log not found');
  }

  return await HealthLog.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

const deleteHealthLog = async (id: string, profileId: string) => {
  const log = await HealthLog.findOneAndDelete({
    _id: id,
    normalUserId: profileId,
  });

  if (!log) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Health log not found');
  }

  return log;
};

const HealthLogServices = {
  createHealthLog,
  getMyHealthLogs,
  updateHealthLog,
  deleteHealthLog,
};

export default HealthLogServices;
