import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./features/users/users.routes";
import foodRoutes from "./features/foods/foods.routes";
import orderRoutes from "./features/orders/orders.routes";
import addressRoutes from "./features/address/address.routes";
import cartRoutes from "./features/carts/cart.routes";
import { connectingToMongoDB } from "./config/mongodb";
import { checkJWT } from "./middlewares/auth.middleware";
import { checkRoles } from "./middlewares/role.middleware";
import authRoutes from "../src/features/auth/auth.routes";

const app = express();

const PORT = process.env.PORT || 3002;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

connectingToMongoDB();
app.use("/api/auth", authRoutes);
app.use("/api/users", checkJWT, userRoutes);
// app.use("/api/admin", checkJWT, checkRoles("admin"), adminRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Your Server is running on ${PORT}`);
});
