import { Router } from "express";
import {
  addToCart,
  getCart,
  removeItem,
  updateCartQuantity,
  clearCart,
} from "./cart.controller";
import { checkJWT } from "../../middlewares/auth.middleware"; // agar authentication middleware hai

const router = Router();

router.post("/add", checkJWT, addToCart);
router.get("/", checkJWT, getCart);
router.delete("/remove/:foodId", checkJWT, removeItem);
router.put("/update/:foodId", checkJWT, updateCartQuantity);
router.delete("/clear", checkJWT, clearCart);
// router.delete("/removeAll", checkJWT, removeAllItem);

export default router;
