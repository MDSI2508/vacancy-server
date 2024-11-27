import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const URI = process.env.ATLAS_URI || "";
const DB_NAME = process.env.DATA_BASE_NAME || "";

console.log('DB_NAME', DB_NAME);

export async function connectToDatabase(): Promise<void> {
    try {

        await mongoose.connect(URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export async function closeDatabaseConnection() {
    try {
        await mongoose.connection.close();
        console.log("Connection to MongoDB closed");
    } catch (error) {
        console.error("Error closing connection to MongoDB:", error);
    }
}
