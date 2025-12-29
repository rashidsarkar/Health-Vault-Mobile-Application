import { Types } from 'mongoose';
import NormalUser from './normalUser.model';

const getSingleNormalUserProfile = async (profileId: string) => {
  const result = await NormalUser.aggregate([
    {
      $match: { _id: new Types.ObjectId(profileId) },
    },
    {
      $lookup: {
        from: 'medicaldocuments',
        localField: '_id',
        foreignField: 'normalUserId',
        as: 'medicalDocument',
      },
    },
  ]);
  return result;
};

const getAllNormalUsers = async () => {
  const result = await NormalUser.find();
  return result;
};

const NormalUserServices = { getSingleNormalUserProfile, getAllNormalUsers };
export default NormalUserServices;
