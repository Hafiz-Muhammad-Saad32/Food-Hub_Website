import { Router } from "express";
import {
  createAddress,
  getAllUserAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "./address.controller";

const router = Router();

router.post("/", createAddress);           
router.get("/", getAllUserAddress);    
router.get("/:id", getAddressById);   
router.patch("/:id", updateAddress);  
router.delete("/:id", deleteAddress); 

export default router;