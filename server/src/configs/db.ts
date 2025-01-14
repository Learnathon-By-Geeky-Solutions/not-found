import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const db = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} ${conn.connection.name}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default db;

