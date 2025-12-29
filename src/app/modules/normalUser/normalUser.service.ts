import NormalUser from './normalUser.model';

const getSingleNormalUserProfile = async (profileId: string) => {
  const result = await NormalUser.findById(profileId);
  return result;
};

const getAllNormalUsers = async () => {
  const result = await NormalUser.find();
  return result;
};

const NormalUserServices = { getSingleNormalUserProfile, getAllNormalUsers };
export default NormalUserServices;
