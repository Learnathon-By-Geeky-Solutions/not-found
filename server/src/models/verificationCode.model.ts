import mongoose from "mongoose";
import verificationCodeType from "../constants/verificationCodeType";
import { oneHourFromNow } from "../utils/date";


export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: verificationCodeType;
    createdAt: Date;
    expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: oneHourFromNow() },
})

const verificationCodeModel = mongoose.model<VerificationCodeDocument>("VerificationCode", verificationCodeSchema, "verification_codes");
export default verificationCodeModel;