import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IClinic } from "./clinic.interface";
import Clinic from "./clinic.model";

const updateUserProfile = async (id: string, payload: Partial<IClinic>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await Clinic.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await Clinic.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const ClinicServices = { updateUserProfile };
export default ClinicServices;