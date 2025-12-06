import { model, Schema } from "mongoose";
import { INormalUser } from "./normalUser.interface";

const normalUserSchema = new Schema<INormalUser>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    profile_image: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 0 }
}, { timestamps: true });

const NormalUser = model<INormalUser>("NormalUser", normalUserSchema);
export default NormalUser;