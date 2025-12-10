import { model, Schema } from "mongoose";
import { IPlasticSurgery } from "./plasticSurgery.interface";

const plasticSurgerySchema = new Schema<IPlasticSurgery>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    profile_image: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 0 }
}, { timestamps: true });

const PlasticSurgery = model<IPlasticSurgery>("PlasticSurgery", plasticSurgerySchema);
export default PlasticSurgery;