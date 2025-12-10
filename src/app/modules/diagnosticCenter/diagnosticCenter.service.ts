import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IDiagnosticCenter } from "./diagnosticCenter.interface";
import DiagnosticCenter from "./diagnosticCenter.model";

const updateUserProfile = async (id: string, payload: Partial<IDiagnosticCenter>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await DiagnosticCenter.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await DiagnosticCenter.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const DiagnosticCenterServices = { updateUserProfile };
export default DiagnosticCenterServices;