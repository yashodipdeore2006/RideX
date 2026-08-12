import mongoose from "mongoose";


export async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`🟢 MongoDB connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


