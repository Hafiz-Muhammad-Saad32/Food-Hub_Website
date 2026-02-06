import { Request, Response } from "express";
import adminModel from "./admin.model";
import {
  loginZodSchema,
  updateUserZodSchema,
  userZodSchema,
} from "../users/users.validation";
import { comparePassword, hashing } from "../../utils/brycpt";
import { generateJWT, jwtCampare } from "../../utils/jwt";
import { UserTypes } from "../../@types/user.type";
import usersModel from "../users/users.model";

// export async function registerAdmin(req: Request, res: Response) {
//   try {
//     const { success, data, error } = userZodSchema.safeParse(req.body);

//     if (!success) {
//       return res.status(400).json({
//         success: false,
//         message: error.issues[0].message,
//       });
//     }

//     const isFound = await adminModel.findOne({ email: data.email });
//     if (isFound) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "admin already exits with this email! Please try with different email",
//       });
//     }

//     const hashedPassword = await hashing(data.password);

//     const admin = new adminModel({
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//       role: data.role,
//       phone: data.phone,
//       experience: data.experience,
//     });

//     const newAdmin = await admin.save();

//     res.status(200).json({
//       success: true,
//       message: "Admin created successfully!",
//       data: newAdmin,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error" + error,
//     });
//   }
// }

export async function getAllUsers(req: Request, res: Response) {
  try {
    const userList = await usersModel.find();

    res.status(200).json({
      success: true,
      message: "All users data fetched successfully!",
      data: userList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function getUser(
  req: Request<{ userId: string }, {}, UserTypes>,
  res: Response,
) {
  try {
    const { userId } = req.params;

    const user = await usersModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User founded successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function updateAdmin(
  req: Request<{ adminId: string }, {}, UserTypes>,
  res: Response,
) {
  try {
    const { success, data, error } = updateUserZodSchema.safeParse(req.body);

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
