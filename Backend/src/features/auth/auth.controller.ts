import { Request, Response } from "express";
import { loginZodSchema, userZodSchema } from "../users/users.validation";
import usersModel from "../users/users.model";
import { comparePassword, hashing } from "../../utils/brycpt";
import { generateJWT } from "../../utils/jwt";
import adminModel from "../admin/admin.model";

import { ZodError } from "zod";

// export async function registorUserO(req: Request, res: Response) {
//   try {
//     const { success, data, error } = userZodSchema.safeParse(req.body);

//     if (error instanceof ZodError) {
//       // console.log("Zod issues:", error.issues); // 🔥 check if Zod errors exist

//       return res.status(400).json({
//         success: false,
//         errors: error.issues, // ⭐ send full array
//       });
//     }

//     if (!success) {
//       return res.status(400).json({
//         success: false,
//         message: error.issues[0].message,
//       });
//     }

//     const isFound = await usersModel.findOne({ email: data?.email });
//     if (isFound) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "User already exits with this email! Please try with different email",
//       });
//     }

//     const hashedPassword = await hashing(data.password);

//     const user = new usersModel({
//       name: data?.name,
//       email: data?.email,
//       experience: data?.experience,
//       phone: data?.phone,
//       password: hashedPassword,
//       role: data?.role,
//     });

//     const newUser = await user.save();
//     res.status(200).json({
//       success: true,
//       message: "User created successfully!",
//       data: newUser,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// }
export async function registorUser(req: Request, res: Response) {
  try {
    const { success, data, error } = userZodSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        errors: error.issues, // ⭐ full Zod errors array
      });
    }

    const isFound = await usersModel.findOne({ email: data.email });
    if (isFound) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with this email. Please use a different email.",
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

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// export const loginUserO = async (req: Request, res: Response) => {
//   try {
//     const { success, data, error } = loginZodSchema.safeParse(req.body);

//     if (!success) {
//       return res.status(400).json({
//         success: false,
//         message: error.issues[0].message,
//       });
//     }

//     const isFound = await usersModel.findOne({ email: data.email });
//     if (!isFound) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isCorrect = await comparePassword(data.password, isFound.password);

//     if (!isCorrect) {
//       return res.status(400).json({
//         success: false,
//         message: "Password is miss matched",
//       });
//     }

//     const payload = {
//       _id: isFound._id, // for cart
//       name: isFound.name,
//       email: isFound.email,
//       role: isFound.role,
//     };

//     const accessToken = generateJWT(payload);

//     res.status(200).json({
//       success: true,
//       message: "User login successfully!",
//       accessToken,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error" + error,
//     });
//   }
// };
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = loginZodSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }

    const user = await usersModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is miss matched",
      });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateJWT(payload);

    res.status(200).json({
      success: true,
      message: "User login successfully!",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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
