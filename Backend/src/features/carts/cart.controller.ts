import { Request, Response } from "express";
import Cart, { ICart } from "./cart.model";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: { _id: string }; // auth middleware se user aayega
}

// Add to Cart
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    console.log("REQ USER:", req.user); // 🔥 check if user is coming
    console.log("BODY:", req.body);
    const { foodId, quantity } = req.body;
    const userId = req.user._id;
    const qty = quantity || 1;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ foodId, quantity: qty }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;
      } else {
        cart.items.push({ foodId, quantity: qty });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.foodId");

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: populatedCart,
    });
  } catch (error: any) {
    console.log("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get User Cart
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.foodId",
    );
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update Item Quantity
export const updateCartQuantity = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    const populatedCart = await cart.populate("items.foodId");

    res.status(200).json({
      success: true,
      data: populatedCart,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Item
export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.foodId.toString() !== foodId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ✅ empty items
    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
