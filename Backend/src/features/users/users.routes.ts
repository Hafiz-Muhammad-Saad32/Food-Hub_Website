import { Router } from "express";
import { updateUser } from "./users.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  userZodSchema,
  loginZodSchema,
  updateUserZodSchema,
} from "./users.validation";
import { checkJWT } from "../../middlewares/auth.middleware";

const route = Router();

route.put("/update/:userId", checkJWT, updateUser);

export default route;
