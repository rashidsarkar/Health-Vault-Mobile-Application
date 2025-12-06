import httpStatus from "http-status";
import AppError from "../../error/appError";
import { INormalUser } from "./normalUser.interface";
import NormalUser from "./normalUser.model";

const updateUserProfile = async (id: string, payload: Partial<INormalUser>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await NormalUser.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await NormalUser.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const NormalUserServices = { updateUserProfile };
export default NormalUserServices;