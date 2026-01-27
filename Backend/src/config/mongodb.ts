import mongoose from "mongoose";

export const connectingToMongoDB = async () => {
  try {
    const uri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Sorry, MongoDD not connected ", error);
  }
};
