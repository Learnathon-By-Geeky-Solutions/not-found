import mongoose from "mongoose";


export interface LeaseDocument extends mongoose.Document {
    apartmentId: mongoose.Types.ObjectId;
    tenantId: mongoose.Types.ObjectId;
    rent: number;
    startMonth: Date;
}

const leaseSchema = new mongoose.Schema<LeaseDocument>({
    apartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    startMonth: {
        type: Date,
        required: true
    }
});

const LeaseModel = mongoose.model("Lease", leaseSchema);
export default LeaseModel;