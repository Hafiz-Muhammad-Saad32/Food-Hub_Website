import { Router } from "express";
import {
    addFood,
    getAllFoods,
    getFoodById,
    updateFoodById,
    deleteFoodById,
} from "./foods.controller";

const router = Router();

router.post("/", addFood);
router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.patch("/:id", updateFoodById);
router.delete("/:id", deleteFoodById);

export default router;
