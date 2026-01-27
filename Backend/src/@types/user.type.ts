import { Document } from "mongoose";

export interface UserTypes extends Document {
  userName: string;
  email: string;
  password: string;
  // age: number;
  role: string;
  skills: string[];
  experience: number;
}
