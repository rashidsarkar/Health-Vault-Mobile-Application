import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IPharmacy } from "./pharmacy.interface";
import Pharmacy from "./pharmacy.model";

const updateUserProfile = async (id: string, payload: Partial<IPharmacy>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await Pharmacy.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await Pharmacy.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const PharmacyServices = { updateUserProfile };
export default PharmacyServices;