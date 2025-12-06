import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IDoctor } from "./doctor.interface";
import Doctor from "./doctor.model";

const updateUserProfile = async (id: string, payload: Partial<IDoctor>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await Doctor.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await Doctor.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const DoctorServices = { updateUserProfile };
export default DoctorServices;