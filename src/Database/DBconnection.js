import mongoose from "mongoose";
require('dotenv').config();

const ConnectDB = async ()=>{

    try {
        await mongoose.connect(process.env.DATABASE_KEY);
        console.log("database connected!");

    } catch (error) {
        console.log("there is error in connecting with database"+error);
    }
}

export default ConnectDB;