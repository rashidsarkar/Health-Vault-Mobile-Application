import { model, Schema } from "mongoose";
import { IDiagnosticCenter } from "./diagnosticCenter.interface";

const diagnosticCenterSchema = new Schema<IDiagnosticCenter>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    profile_image: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 0 }
}, { timestamps: true });

const DiagnosticCenter = model<IDiagnosticCenter>("DiagnosticCenter", diagnosticCenterSchema);
export default DiagnosticCenter;