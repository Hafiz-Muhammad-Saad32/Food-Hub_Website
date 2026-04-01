import mongoose from "mongoose";
import foodsModel from "../features/foods/foods.model";

export const connectingToMongoDB = async () => {
  try {
    const uri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");

    //* Optional: clear old foods
    // await foodsModel.deleteMany({});
    // console.log("Old foods cleared");

    // * Insert sample foods
    // await foodsModel.insertMany(sampleFoods20);
    // console.log("20 foods inserted successfully ✅");
  } catch (error) {
    console.error("Sorry, MongoDD not connected ", error);
  }
};
