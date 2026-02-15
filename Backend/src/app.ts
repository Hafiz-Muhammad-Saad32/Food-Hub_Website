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
import { globalLimiter, authLimiter } from "./middlewares/rateLimiter";
const app = express();

const PORT = process.env.PORT || 3002;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

connectingToMongoDB();

app.use("/api/auth", authLimiter, authRoutes);

app.use(globalLimiter);

app.use("/api/users", checkJWT, userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", checkJWT, orderRoutes);
app.use("/api/address", checkJWT, addressRoutes);
app.use("/api/cart", checkJWT, cartRoutes);

app.listen(PORT, () => {
  console.log(`Your Server is running on ${PORT}`);
});
