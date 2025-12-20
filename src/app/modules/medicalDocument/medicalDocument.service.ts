import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IMedicalDocument } from "./medicalDocument.interface";
import MedicalDocument from "./medicalDocument.model";

const updateUserProfile = async (id: string, payload: Partial<IMedicalDocument>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await MedicalDocument.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await MedicalDocument.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const MedicalDocumentServices = { updateUserProfile };
export default MedicalDocumentServices;