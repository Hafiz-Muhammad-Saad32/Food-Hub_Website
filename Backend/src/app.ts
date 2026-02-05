import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectingToMongoDB } from "./config/mongodb";

//import userRoutes from "./routes/user-routes";
//import adminRoutes from "./routes/admin-routes";
import foodRoutes from "./features/foods/foods.routes";
import ordersRoutes from "./features/orders/orders.routes";
import addressRoutes from "./features/address/address.routes";
//import { checkJWT } from "./features/auth/";
//import { checkRoles } from "./middlewares/roles-middleware";


const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

connectingToMongoDB();

app.use("/api/foods", foodRoutes);
app.use("/api/orders",ordersRoutes); 
app.use("/api/addresses", addressRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
