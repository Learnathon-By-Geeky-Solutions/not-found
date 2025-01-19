import mongoose from "mongoose";
import { comparePassword, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    nid_picture: string;
    role: mongoose.Types.ObjectId;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, "name" | "email" | "nid_picture" | "role" | "createdAt" | "updatedAt">;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: { type: String, required: true, index: true },
        email: { type: String, required: true, index: true, unique: true },
        password: { type: String, required: true },
        nid_picture: { type: String, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, required: true },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await hashValue(this.password);
    }
    next();
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await comparePassword(candidatePassword, this.password);
}

userSchema.methods.omitPassword = async function (): Promise<void> {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;