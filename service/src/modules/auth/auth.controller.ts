import { NextFunction, Response } from "express";

class AuthContoller {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json({
        message: "Register",
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
  static async login(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json({
        message: "login",
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
