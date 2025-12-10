import { model, Schema } from "mongoose";
import { IInVitroFertilization } from "./inVitroFertilization.interface";

const inVitroFertilizationSchema = new Schema<IInVitroFertilization>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    profile_image: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 0 }
}, { timestamps: true });

const InVitroFertilization = model<IInVitroFertilization>("InVitroFertilization", inVitroFertilizationSchema);
export default InVitroFertilization;