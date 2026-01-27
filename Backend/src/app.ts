import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./routes/user-routes";
import adminRoutes from "./routes/admin-routes";
import { connectingToMongoDB } from "./config/mongodb";
import userLogger from "./middlewares/user-logger";
import { checkJWT } from "./middlewares/auth";
import { checkRoles } from "./middlewares/roles-middleware";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json(), userLogger);

connectingToMongoDB();
app.use("/api", userRoutes);
app.use("/api/admin", checkJWT, checkRoles("admin"), adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
