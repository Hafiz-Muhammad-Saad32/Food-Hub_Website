import { Request, Response } from "express";
import userModel from "./users.model";
import {
  loginZodSchema,
  userZodSchema,
  updateUserZodSchema,
} from "./users.validation";
import { comparePassword, hashing } from "../../utils/brycpt";
import { generateJWT, jwtCampare } from "../../utils/jwt";
import { UserTypes } from "../../@types/user.type";



export async function updateUser(
  req: Request<{ userId: string }, {}, UserTypes>,
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


