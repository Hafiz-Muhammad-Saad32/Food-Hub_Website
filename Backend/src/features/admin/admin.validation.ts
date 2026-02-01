import z from "zod";

export const adminValidators = z.object({
  adminName: z.string().min(3, "Length must be three or more character"),
  email: z.email(),
  skills: z.array(z.string()),
  experience: z.number().min(0),
  role: z.enum(["user", "admin"]).default("user"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
});

export const loginAdminValidators = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
});

export const updateAdminValidators = z.object({
 adminName: z
    .string()
    .min(3, "Length must be three or more character")
    .optional(),
  email: z.email().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(["user", "admin"]).optional(),
  skills: z.array(z.string()).optional(),
  experience: z.number().min(0).optional(),
});
