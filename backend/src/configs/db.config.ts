import mongoose from "mongoose";
import { DB_URL } from "./server.config";

async function connetDB() : Promise<void> {
    try {
        await mongoose.connect(DB_URL ?? "");
        console.log("Connected to database");
    }
    catch(err){
        console.log("Cant connect with database");
    }
}

export default connetDB;