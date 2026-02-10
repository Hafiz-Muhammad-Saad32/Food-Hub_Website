import { Router } from "express";
import {
  createAddress,
  getAllUserAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "./address.controller";
import { checkJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", checkJWT, createAddress);
router.get("/", checkJWT, getAllUserAddress);
router.get("/:id", checkJWT, getAddressById);
router.patch("/update/:id", checkJWT, updateAddress);
router.delete("/delete/:id", checkJWT, deleteAddress);

export default router;