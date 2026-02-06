import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./features/users/users.routes";
import adminRoutes from "./features/admin/admin.routes";
import { connectingToMongoDB } from "./config/mongodb";
import { checkJWT } from "./middlewares/auth.middleware";
import { checkRoles } from "./middlewares/role.middleware";
import authRoutes from "../src/features/auth/auth.routes";
// import userLogger from "./middlewares/user-logger";
// import { checkJWT } from "./";
// import { checkRoles } from "./middlewares/roles-middleware";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

connectingToMongoDB();
app.use("/auth", authRoutes);
app.use("/api/user", checkJWT, userRoutes);
app.use("/api/admin", checkJWT, checkRoles("admin"), adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
