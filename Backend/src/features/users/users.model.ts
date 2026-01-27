import mongoose from "mongoose";
import { UserTypes } from "../@types/user-types";
import { number } from "zod";

const userSchema = new mongoose.Schema<UserTypes>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    // age: { type: Number, min: 10, max: 60 },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    experience: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<UserTypes>("User", userSchema);
