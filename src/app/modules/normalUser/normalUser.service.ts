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

const getAllNormalUsers = async (query: Record<string, unknown>) => {
  // 1️⃣ PAGINATION SETUP
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // 2️⃣ GET TOTAL COUNT
  const total = await NormalUser.countDocuments();

  // 3️⃣ GET PAGINATED DATA
  const result = await NormalUser.aggregate([
    {
      $lookup: {
        from: 'medicaldocuments',
        localField: '_id',
        foreignField: 'normalUserId',
        as: 'medicalDocument',
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { normalUserId: { $toString: '$_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$profileId', '$$normalUserId'],
              },
            },
          },
          {
            $project: {
              password: 0, // ❌ remove password
              verifyEmailOTP: 0,
              verifyEmailOTPExpire: 0,
              isResetOTPVerified: 0,
              __v: 0,
            },
          },
        ],
        as: 'user',
      },
    },
  ])
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // optional

  const totalPage = Math.ceil(total / limit);

  // 4️⃣ RETURN DATA + META
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const NormalUserServices = { getSingleNormalUserProfile, getAllNormalUsers };
export default NormalUserServices;
