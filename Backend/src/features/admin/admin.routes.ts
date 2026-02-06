import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { loginZodSchema, userZodSchema } from "../users/users.validation";
import {
  getAllUsers,
  getUser,
} from "../admin/admin.controller";
const route = Router();

// route.post("/auth/login", validate(loginZodSchema), loginAdmin);
// route.post("/auth/register", registerAdmin);

route.get("/users", getAllUsers);
route.get("/user/:userId", getUser);
// route.delete("/user/harddelete/:userId", HardDeleteUser);

export default route;
