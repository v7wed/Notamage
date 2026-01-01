import mongoose from "mongoose";

const connectDB = async () => {
  try { 
    const MONGO = process.env.NODE_ENV == "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
    await mongoose.connect(MONGO);
    console.log("MongoDB Connection Success");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};
export default connectDB;
