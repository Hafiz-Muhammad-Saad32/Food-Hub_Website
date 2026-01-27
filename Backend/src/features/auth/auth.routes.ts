import { Router } from "express";
import { login, register } from "./auth.controller";
import { validate } from "../../utils/validate";
import { registerSchema, loginSchema } from "./auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), register);  // Any user can register
router.post("/login", validate(loginSchema), login);          // Any user can login

export default router;
