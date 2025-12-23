import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../user/user.const';

import Notification from './notification.model';
import QueryBuilder from '../../builder/QueryBuilder';
import getAdminNotificationCount from '../../helper/getAdminNotification';
import getNotificationCount from '../../helper/getUnseenNotification';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getIO } from '../../socket/socket';

const getAllNotificationFromDB = async (
  query: Record<string, any>,
  user: JwtPayload,
) => {
  if (user?.role === USER_ROLE.ADMIN) {
    const notificationQuery = new QueryBuilder(
      Notification.find({
        $or: [{ receiver: USER_ROLE.ADMIN }, { receiver: 'all' }],
        deleteBy: { $ne: user.profileId },
      }),
      query,
    )
      .search(['name'])
      .filter()
      .sort()
      .paginate();
    const result = await notificationQuery.modelQuery;
    const meta = await notificationQuery.countTotal();
    return { meta, result };
  } else {
    const notificationQuery = new QueryBuilder(
      Notification.find({
        $or: [{ receiver: user?.id }, { receiver: 'all' }],
        deleteBy: { $ne: user?.profileId },
      }),

      query,
    )
      .search(['title'])
      .filter()
      .sort()
      .paginate();

    const result = await notificationQuery.modelQuery;
    const meta = await notificationQuery.countTotal();
    return { meta, result };
  }
};

const seeNotification = async (user: JwtPayload) => {
  let result;
  const io = getIO();
  if (user?.role === USER_ROLE.ADMIN) {
    result = await Notification.updateMany(
      { $or: [{ receiver: USER_ROLE.ADMIN }, { receiver: 'all' }] },
      { $addToSet: { seenBy: user.profileId } },
      { runValidators: true, new: true },
    );
    const adminUnseenNotificationCount = await getAdminNotificationCount();
    const notificationCount = await getNotificationCount();
    io.emit('admin-notifications', adminUnseenNotificationCount);
    io.emit('notifications', notificationCount);
  }
  if (user?.role !== USER_ROLE.ADMIN) {
    result = await Notification.updateMany(
      { $or: [{ receiver: user.profileId }, { receiver: 'all' }] },
      { $addToSet: { seenBy: user.profileId } },
      { runValidators: true, new: true },
    );
  }
  const notificationCount = await getNotificationCount(user.profileId);
  io.to(user.profileId.toString()).emit('notifications', notificationCount);
  return result;
};

const deleteNotification = async (id: string, profileId: string) => {
  const notification = await Notification.findById(id);
  if (!notification) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Notification not found');
  }
  if (notification.receiver == profileId) {
    const reusult = await Notification.findByIdAndDelete(id);
    return reusult;
  } else if (notification.receiver == 'all') {
    const result = await Notification.findByIdAndUpdate(id, {
      $addToSet: { deleteBy: profileId },
    });
    return result;
  } else {
    return null;
  }
};

const notificationService = {
  getAllNotificationFromDB,
  seeNotification,
  deleteNotification,
};

export default notificationService;
