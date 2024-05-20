import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const cached : any= {};

export async function dbConnect() {
    if (!MONGO_URI) {
        throw new Error(
            "Please define the MONGO_URI environment variable inside .env.local"
        );
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
     
        cached.promise = mongoose.connect(MONGO_URI);
    }
    try {
        cached.connection = await cached.promise;
        console.log("connection")
    } catch (e) {
        cached.promise = undefined;
        throw e;
    }
    return cached.connection;
}
