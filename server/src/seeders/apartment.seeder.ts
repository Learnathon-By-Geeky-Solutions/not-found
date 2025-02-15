import 'dotenv/config'
import mongoose from 'mongoose';
import connectDb from '../configs/db'
import ApartmentModel from '../models/apartment.model';

const seedApartments = async function() {
    console.log("Seeding apartment has started...");
    try {
        await connectDb();
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log("Session has started")
        
        const apartmentNames = ["1A", "1B", "2A", "2B"];
        for (const apartmentName of apartmentNames) {
            const app = await ApartmentModel.findOne({name: apartmentName});
            if(!app){
                await ApartmentModel.create({name: apartmentName, ownerId: "67ac4273de77df2b0f2fb271"});
                console.log("A new apartment has been created with name: ", apartmentName);
            }
        }

        await session.commitTransaction();
        console.log("Transaction committed");

        await session.endSession();
        console.log("Session ended");

        console.log("Seeding completed successfully");
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
} 

seedApartments();