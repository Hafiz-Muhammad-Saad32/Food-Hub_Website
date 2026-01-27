import { Request, Response } from "express";
import adminModel from "./admin.model";
import {
  adminValidators,
  loginAdminValidators,
  updateAdminValidators,
} from "./admin.validation";
import { comparePassword, hashing } from "../../utils/brycpt";
import { generateJWT, jwtCampare } from "../../utils/jwt";

interface AdminReqBody {
  userName: string;
  email: string;
  password: string;
  role: string;
  experience: number;
  skills: string[];
}

export async function registerAdmin(req: Request, res: Response) {
  try {
    const { success, data, error } = adminValidators.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    const isFound = await adminModel.findOne({ email: data.email });
    if (isFound) {
      return res.status(400).json({
        success: false,
        message:
          "admin already exits with this email! Please try with different email",
      });
    }

    const hashedPassword = await hashing(data.password);

    const admin = new adminModel({
      adminName: data.adminName,
      email: data.email,
      experience: data.experience,
      skills: data.skills,
      password: hashedPassword,
      role: data.role,
    });

    const newAdmin = await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin created successfully!",
      data: newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = loginAdminValidators.safeParse(req.body);

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
      name: isFound.adminName,
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

export async function updateAdmin(
  req: Request<{ adminId: string }, {}, AdminReqBody>,
  res: Response,
) {
  try {
    const { success, data, error } = updateAdminValidators.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    if (data.password) {
      data.password = await hashing(data.password);
    }

    const updatedUser = await adminModel.findByIdAndUpdate(
      req.params.adminId,
      data,
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully by admin",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}
