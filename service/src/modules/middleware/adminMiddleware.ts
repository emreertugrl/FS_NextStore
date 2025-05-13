import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "./authMiddleware.ts";

function admin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded: jwt.JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );

    // Check if user role is "User"
    if (decoded.role === "User") {
      return res.status(403).json({ message: "Forbidden: Admin role required" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default admin;
