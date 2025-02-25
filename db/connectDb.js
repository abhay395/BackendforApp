import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mongodbURI = process.env.MONGODBURI;
  if (!mongodbURI) {
    console.error("MongoDB URI is not defined in the environment variables.");
    return;
  }
  
  try {
    await mongoose.connect(mongodbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
export default connectDB;
