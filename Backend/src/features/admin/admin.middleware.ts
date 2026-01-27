import { Request, Response, NextFunction } from "express";
import { jwtCampare } from "../utils/jwt";
import { AuthRequest } from "../@types/auth-request";

export function checkJWT(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }
    const decoded = jwtCampare(token);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}
