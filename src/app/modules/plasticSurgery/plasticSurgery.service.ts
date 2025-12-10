import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IPlasticSurgery } from "./plasticSurgery.interface";
import PlasticSurgery from "./plasticSurgery.model";

const updateUserProfile = async (id: string, payload: Partial<IPlasticSurgery>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await PlasticSurgery.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await PlasticSurgery.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const PlasticSurgeryServices = { updateUserProfile };
export default PlasticSurgeryServices;