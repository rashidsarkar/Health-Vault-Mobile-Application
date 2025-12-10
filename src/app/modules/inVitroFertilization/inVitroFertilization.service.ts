import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IInVitroFertilization } from "./inVitroFertilization.interface";
import InVitroFertilization from "./inVitroFertilization.model";

const updateUserProfile = async (id: string, payload: Partial<IInVitroFertilization>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await InVitroFertilization.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await InVitroFertilization.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const InVitroFertilizationServices = { updateUserProfile };
export default InVitroFertilizationServices;