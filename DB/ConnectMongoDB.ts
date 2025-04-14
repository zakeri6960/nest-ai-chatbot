import mongoose from "mongoose";

export default async function ConnectMongoDB(){
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/chatbotDB');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}