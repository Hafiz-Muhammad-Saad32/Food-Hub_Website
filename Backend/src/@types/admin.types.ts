import { Document } from "mongoose";

export interface AdminTypes extends Document {
  adminName: string;
  email: string;
  password: string;
  age: number;
  role: string;
  skills: string[];
  experience: number;
}
