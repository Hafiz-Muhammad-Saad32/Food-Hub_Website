import mongoose from "mongoose";
import { AdminTypes } from "../../@types/admin.types";

const adminSchema = new mongoose.Schema<AdminTypes>(
  {
    adminName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number, min: 10, max: 60 },
    role: { type: String, default: "admin" },
    experience: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<AdminTypes>("AdminsCollections", adminSchema);
