import { Router } from "express";
import { getAllUsers, updateUser, HardDeleteUser } from "./users.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  userZodSchema,
  loginZodSchema,
  updateUserZodSchema,
} from "./users.validation";
import { checkJWT } from "../../middlewares/auth.middleware";

const route = Router();

route.put("/update/:userId", updateUser);

route.get("/", getAllUsers);
route.delete("/delete/:userId", HardDeleteUser);
// route.get("/user/:userId", getUser);

export default route;
