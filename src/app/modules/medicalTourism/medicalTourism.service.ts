import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IMedicalTourism } from "./medicalTourism.interface";
import MedicalTourism from "./medicalTourism.model";

const updateUserProfile = async (id: string, payload: Partial<IMedicalTourism>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await MedicalTourism.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await MedicalTourism.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const MedicalTourismServices = { updateUserProfile };
export default MedicalTourismServices;