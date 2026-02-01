import { Router } from "express";
import { loginUser, registorUser } from "./users.controller";

const route = Router();

route.post("/auth/register", registorUser);
route.post("/auth/login", loginUser);

export default route;
