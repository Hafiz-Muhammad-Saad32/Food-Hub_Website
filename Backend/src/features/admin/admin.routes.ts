import { Router } from "express";
import { loginAdmin, registerAdmin, updateAdmin } from "./admin.controller";

const route = Router();

route.post("/admin/register", registerAdmin);
route.post("/admin/login", loginAdmin);
route.post("/admin/:adminId/update", updateAdmin);

export default route;
