import { Router } from "express";
import {
    addFood,
    getAllFoods,
    getFoodById,
    updateFoodById,
    deleteFoodById,
} from "./foods.controller";
import { checkJWT } from "../auth/auth.middleware";  

const router = Router();

router.post("/add", addFood);
router.get("/", getAllFoods);
router.get("/getById/:id", getFoodById);
router.patch("/update/:id",updateFoodById);
router.delete("/delete/:id", deleteFoodById);

export default router;
