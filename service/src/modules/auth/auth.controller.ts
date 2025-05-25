import { Request, Response, NextFunction } from "express";
import { createUserSchema, loginUserSchema, validateUserDto } from "./auth.dto.ts";
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
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // 1. DTO ile gelen veriyi validate et
      const value = await validateUserDto(loginUserSchema, req.body);
      // 2. Giriş işlemi ve token üretimi
      const { user, accessToken, refreshToken } = await AuthService.login(value);
      // 3. Refresh token'ı httpOnly cookie olarak set et
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true, // XSS'e karşı güvenli
          // secure: process.env.NODE_ENV === "production",
          sameSite: "strict", // CSRF'e karşı koruma
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
        })
        .status(200)
        .json({ user, accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }
  static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req?.cookies?.refreshToken;
      if (!refreshToken) {
        throw new Error("Refresh token not available");
        return;
      }
      const accessToken = await AuthService.refreshToken(refreshToken);

      res.status(200).json(accessToken);
    } catch (error) {
      next(error);
    }
  }
  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req?.cookies?.refreshToken; // 🍪 Cookie'den alınır
      if (!refreshToken) {
        throw new Error("Refresh token not provided");
      }
      // Servis çağrılır
      await AuthService.logout(refreshToken); // Eğer böyle bir servis yazdıysan

      // Cookie'yi temizle
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
  static async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req?.cookies?.refreshToken || req.refreshToken; // 🍪 Cookie'den alınır
      if (!refreshToken) {
        throw new Error("Refresh token not provided");
      }
      // Servis çağrılır
      const user = await AuthService.me(req.user.userId); // Eğer böyle bir servis yazdıysan

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req?.cookies?.refreshToken || req.refreshToken; // 🍪 Cookie'den alınır
      if (!refreshToken) {
        throw new Error("Refresh token not provided");
      }
      // Servis çağrılır
      console.log(req.body);
      const user = await AuthService.updateMe(req.user.userId, req.body.profileImage); // Eğer böyle bir servis yazdıysan

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async addRemoveFavourites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId } = req?.params;

      // Servis çağrılır
      const favourites = await AuthService.addRemoveFavourites(req.user.userId, productId); // Eğer böyle bir servis yazdıysan

      res.status(200).json(favourites);
    } catch (error) {
      next(error);
    }
  }
  static async getUserFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req?.params;
      console.log(id);
      console.log(req.user);

      if (req.user.userId !== id) {
        throw new Error("User id isn't defined");
      }
      const getUserFavorites = await AuthService.getUserFavorites(req.user.userId); // Eğer böyle bir servis yazdıysan

      res.status(200).json(getUserFavorites);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthContoller;
