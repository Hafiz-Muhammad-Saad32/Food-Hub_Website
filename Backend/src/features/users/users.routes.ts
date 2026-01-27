import { Router } from "express";
import { loginUser, registorUser } from "../controllers/user-controllers";

const route = Router();

route.post("/auth/register", registorUser);
route.post("/auth/login", loginUser);

export default route;
