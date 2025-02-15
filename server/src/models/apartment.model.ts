import mongoose from "mongoose";


export interface ApartmentDocument extends mongoose.Document {
    name: string;
    owenerId: mongoose.Types.ObjectId;
}

const apartmentSchema = new mongoose.Schema<ApartmentDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owenerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const ApartmentModel = mongoose.model('Apartment', apartmentSchema);
export default ApartmentModel;