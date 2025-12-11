import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IWellness } from "./wellness.interface";
import Wellness from "./wellness.model";

const updateUserProfile = async (id: string, payload: Partial<IWellness>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await Wellness.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await Wellness.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const WellnessServices = { updateUserProfile };
export default WellnessServices;