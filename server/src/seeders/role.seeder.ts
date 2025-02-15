import 'dotenv/config'
import mongoose from 'mongoose';
import connectDb from '../configs/db'
import RoleModel from '../models/role.model';

const seedRoles = async () => {
    console.log("Seeding role has stated...")
    try {
        await connectDb();
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log("Session has started")

        const unassigned = await RoleModel.findOne({role: "unassigned"});
        if(unassigned){
            console.log("Skiping unassiged role...");
        }
        else {
            console.log("Creating unassiged role...");
            await RoleModel.create({role: "unassigned"});
        }

        const tenant = await RoleModel.findOne({role: "tenant"});
        if(tenant){
            console.log("Skiping tenant role...");
        }
        else {
            console.log("Creating tentant role...");
            await RoleModel.create({role: "tenant"});
        }

        const owner = await RoleModel.findOne({role: "owner"});
        if(owner){
            console.log("Skiping owner role...");
        }
        else {
            console.log("Creating owner role...");
            await RoleModel.create({role: "owner"});
        }

        const manager = await RoleModel.findOne({role: "manager"});
        if(manager){
            console.log("Skiping manager role...");
        }
        else {
            console.log("Creating manager role...");
            await RoleModel.create({role: "manager"});
        }

        const staff = await RoleModel.findOne({role: "staff"});
        if(staff){
            console.log("Skiping staff role...");
        }
        else {
            console.log("Creating staff role...");
            await RoleModel.create({role: "staff"});
        }

        await session.commitTransaction();
        console.log("Transaction committed");

        session.endSession();
        console.log("Session ended");

        console.log("Seeding completed successfully");
    } catch (error) {
        console.log("An error happened: ", error);
    }
}

seedRoles();
