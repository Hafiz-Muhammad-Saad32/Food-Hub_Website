import { Router } from "express";
import { addToCart, getCart, removeItem } from "./cart.controller";
import { checkJWT } from "../../middlewares/auth.middleware"; // agar authentication middleware hai

const router = Router();

router.post("/add", checkJWT, addToCart);
router.get("/", checkJWT, getCart);
router.delete("/remove/:foodId", checkJWT, removeItem);
// router.delete("/removeAll", checkJWT, removeAllItem);

export default router;
