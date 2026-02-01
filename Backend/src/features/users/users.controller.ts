import { Request, Response } from "express";
import userModel from "./users.model";
import {
  loginZodSchema,
  userZodSchema,
  updateUserZodSchema,
} from "./users.validation";
import { comparePassword, hashing } from "../../utils/brycpt";
import { generateJWT, jwtCampare } from "../../utils/jwt";

interface UsersReqBody {
  userName: string;
  email: string;
  password: string;
  role: string;
  experience: number;
  skills: string[];
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const userList = await userModel.find();

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
  req: Request<{ userId: string }, {}, UsersReqBody>,
  res: Response,
) {
  try {
    const { userId } = req.params;

    const user = await userModel.findOne({ _id: userId });

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

export async function updateUser(
  req: Request<{ userId: string }, {}, UsersReqBody>,
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

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.userId,
      data,
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully by admin",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function HardDeleteUser(
  req: Request<{ userId: string }>,
  res: Response,
) {
  try {
    const { userId } = req.params;

    const deletedUser = await userModel.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "Sorry, This ID name user not found in database.",
      });
    }
    res.status(200).json({
      message: "User hard deleted successfully by admin",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function registorUser(req: Request, res: Response) {
  try {
    const { success, data, error } = userZodSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    const isFound = await userModel.findOne({ email: data.email });
    if (isFound) {
      return res.status(400).json({
        success: false,
        message:
          "User already exits with this email! Please try with different email",
      });
    }

    const hashedPassword = await hashing(data.password);

    const user = new userModel({
      userName: data.userName,
      email: data.email,
      experience: data.experience,
      skills: data.skills,
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

    const isFound = await userModel.findOne({ email: data.email });
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
      name: isFound.userName,
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
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
};
