import mongoose from "mongoose";


export interface RoleDocument extends mongoose.Document {
    role: String;
}

const roleSchema = new mongoose.Schema<RoleDocument>({
    role: { type: String, required: true },
})

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;