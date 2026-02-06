import { Request, Response } from "express";
import { loginZodSchema, userZodSchema } from "../users/users.validation";
import usersModel from "../users/users.model";
import { comparePassword, hashing } from "../../utils/brycpt";
import { generateJWT } from "../../utils/jwt";
import adminModel from "../admin/admin.model";

export async function registorUser(req: Request, res: Response) {
  try {
    const { success, data, error } = userZodSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    const isFound = await usersModel.findOne({ email: data.email });
    if (isFound) {
      return res.status(400).json({
        success: false,
        message:
          "User already exits with this email! Please try with different email",
      });
    }

    const hashedPassword = await hashing(data.password);

    const user = new usersModel({
      name: data.name,
      email: data.email,
      experience: data.experience,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
    });

    const newUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = loginZodSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    const isFound = await usersModel.findOne({ email: data.email });
    if (!isFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCorrect = await comparePassword(data.password, isFound.password);

    if (!isCorrect) {
      return res.status(400).json({
        success: false,
        message: "Password is miss matched",
      });
    }

    const payload = {
      name: isFound.name,
      email: isFound.email,
      role: isFound.role,
    };

    const accessToken = generateJWT(payload);

    res.status(200).json({
      success: true,
      message: "User login successfully!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = loginZodSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    const isFound = await adminModel.findOne({ email: data.email });
    if (!isFound) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isCorrect = await comparePassword(data.password, isFound.password);

    if (!isCorrect) {
      return res.status(400).json({
        success: false,
        message: "Password is miss matched",
      });
    }

    const payload = {
      name: isFound.name,
      email: isFound.email,
      role: isFound.role,
    };

    const accessToken = generateJWT(payload);

    res.status(200).json({
      success: true,
      message: "Admin login successfully!",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
};