import { Request, Response } from "express";
import * as foodService from "./foods.service";
import { foodParam, foodSchema } from "./foods.validation";

//  ADD FOOD
export const addFood = async (req: Request, res: Response) => {

    const { success, error, data } = foodSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            success: false,
            error: error.issues[0].message,
        });
    }

    try {
        const food = await foodService.createFood(data);

        return res.status(200).json({
            message: "Food added successfully",
            data: food,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error " + err.message,
        });
    }
};

//  GET ALL FOODS
export const getAllFoods = async (req: Request, res: Response) => {
    try {
        const foods = await foodService.getAllFoods();

        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Foods are available",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Foods fetched successfully",
            data: foods,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error " + err.message,
        });
    }
};

//  GET FOOD BY ID
export const getFoodById = async (req: Request, res: Response) => {

    const parsed = foodParam.safeParse(req.params);

    if (!parsed.success) {
        return res.status(404).json({
            success: false,
            error: parsed.error.issues[0].message,
        });
    }

    try {
        const food = await foodService.getFoodById(parsed.data.id);
        
        if (food?.deletedAt != null) {
            return res.status(404).json({
                message: "Food has deleted",
            });
        }

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food fetched successfully",
            data: food,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error " + err.message,
        });
    }
};

//  UPDATE FOOD
export const updateFoodById = async (req: Request, res: Response) => {

    const id = foodParam.safeParse(req.params);
    const body = foodSchema.partial().safeParse(req.body);

    if (!id.success) {
        return res.status(400).json({
            success: false,
            error: id.error.issues[0].message,
        });
    }

    if (!body.success) {
        return res.status(400).json({
            success: false,
            error: body.error.issues[0].message,
        });
    }

    try {
        const food = await foodService.updateFoodById(
            id.data.id,
            body.data
        );

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food updated successfully",
            data: food,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + err.message,
        });
    }
};

//  DELETE FOOD (SOFT)
export const deleteFoodById = async (req: Request, res: Response) => {

    const parsed = foodParam.safeParse(req.params);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.issues[0].message,
        });
    }

    try {
        const food = await foodService.softDeleteFoodById(parsed.data.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        return res.json({
            success: true,
            message: "Food deleted softly",
            data: food,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + err.message,
        });
    }
};
