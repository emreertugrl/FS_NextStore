import { Request, Response, NextFunction } from "express";
import { createUserSchema, validateUserDto } from "./auth.dto.ts";
import AuthService from "./auth.service.ts";

// Kullanıcı kaydı
class AuthContoller {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const value = await validateUserDto(createUserSchema, req.body);
      const user = await AuthService.register(value);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json({
        message: "login",
      });
    } catch (error) {}
  }
  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json({
        message: "refresh",
      });
    } catch (error) {}
  }
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json({
        message: "logout",
      });
    } catch (error) {}
  }
}

export default AuthContoller;
