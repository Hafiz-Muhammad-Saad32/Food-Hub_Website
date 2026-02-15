import { Router } from "express";
import { validate } from "./../../middlewares/validate.middleware";
import { loginZodSchema } from "../users/users.validation";
import {
  loginAdmin,
  loginUser,
  registorUser,
  verifyEmail,
} from "./auth.controller";
const route = Router();

route.post("/user/login", validate(loginZodSchema), loginUser);
route.post("/user/register", registorUser);
route.post("/admin/login", validate(loginZodSchema), loginAdmin);
route.get("/verify-email/:token", verifyEmail);

export default route;
