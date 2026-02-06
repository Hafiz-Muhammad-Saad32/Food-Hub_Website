import { Router } from "express";
import { validate } from "./../../middlewares/validate.middleware";
import { loginZodSchema, userZodSchema } from "../users/users.validation";
import { loginAdmin, loginUser, registorUser } from "./auth.controller";
const route = Router();

// user routes:
route.post("/user/login", validate(loginZodSchema), loginUser);
route.post("/user/register", registorUser);

// admin routes:
route.post("/admin/login", validate(loginZodSchema), loginAdmin);
// route.post("/admin/register", validate(userZodSchema), registerAdmin);

export default route;
