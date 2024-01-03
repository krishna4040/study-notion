import mongoose from 'mongoose'
require('dotenv').config();

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB!);
        console.log("Databae connected");
    } catch (error) {
        console.log(error);
    }
}