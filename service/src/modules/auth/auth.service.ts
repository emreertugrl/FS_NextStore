import Product from "../product/product.model.ts";
import { UserLoginDto, UserRegisterDto } from "./auth.dto.ts";
import User from "./auth.model.ts";
import jwt from "jsonwebtoken";

class AuthService {
  // Create Access Token
  static async generateAccessToken(user: any) {
    const payload: { userId: string; email: string; role: string } = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_SECRET_EXPIRE });
  }

  // Create Refresh Token
  static async generateRefreshToken(user: any) {
    const payload = {
      userId: user._id.toString(),
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRE!,
    });
  }

  // Verify Token
  static async validateToken(token: string, isRefreshToken = false) {
    try {
      const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET! : process.env.JWT_SECRET!;
      const decoded = jwt.verify(token, secret) as { userId: string };
      return decoded;
    } catch (error) {
      throw new Error("Geçersiz token");
    }
  }
  static async register(userData: UserRegisterDto) {
    try {
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { username: userData.username }],
      });
      if (existingUser) {
        throw new Error("Invalid credentials");
      }

      // Access Token ve Refresh Token üretmek
      const user = new User({ ...userData });

      await user.save();
      const { password, __v, ...userWithoutPassword } = user.toObject();
      return { ...userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
  static async login(userData: UserLoginDto) {
    try {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await existingUser.comparePassword(userData.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      // Access Token ve Refresh Token üretmek
      const accessToken = await this.generateAccessToken(existingUser);
      const refreshToken = await this.generateRefreshToken(existingUser);
      // Refresh token'ı veritabanına kaydet
      existingUser.refreshToken = refreshToken;
      await existingUser.save();

      // Şifre ve diğer hassas veriler olmadan kullanıcıyı dön
      const {
        password,
        __v,
        refreshToken: _,
        ...userWithoutSensitiveData
      } = existingUser.toObject();

      return {
        user: userWithoutSensitiveData,
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw error;
    }
  }
  static async logout(refreshToken: string) {
    try {
      const user = await User.findOne({ refreshToken });
      if (!user) {
        throw new Error("Refresh token invalid");
      }

      // refreshToken alanını sıfırla
      user.refreshToken = null;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
  static async refreshToken(refreshToken: string) {
    try {
      const decoded = await this.validateToken(refreshToken, true);
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error("User not found");
        return;
      }
      const accessToken = await this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        const err = new Error("Refresh token expired");
        // @ts-ignore
        err.statusCode = 401;
        throw err;
      }

      if (error.name === "JsonWebTokenError") {
        const err = new Error("Invalid refresh token");
        // @ts-ignore
        err.statusCode = 403;
        throw err;
      }
      throw error;
    }
  }
  static async me(userId: string) {
    try {
      const existingUser = await User.findOne({ _id: userId });
      if (!existingUser) {
        throw new Error("Refresh token invalid");
      }

      const {
        password,
        __v,
        refreshToken: _,
        ...userWithoutSensitiveData
      } = existingUser.toObject();
      return userWithoutSensitiveData;
    } catch (error) {
      throw error;
    }
  }
  static async addRemoveFavourites(userId: string, productId: string) {
    try {
      const existingUser = await User.findOne({ _id: userId });
      if (!existingUser) {
        throw new Error("Refresh token invalid");
      }
      const existingProduct = await Product.findOne({ _id: productId });
      if (!existingProduct) {
        throw new Error("Product not found");
      }
      const index = existingUser.favorites.indexOf(productId as any);

      if (index === -1) {
        // Favorilere ekle
        existingUser.favorites.push(productId as any);
      } else {
        // Favorilerden çıkar
        existingUser.favorites.splice(index, 1);
      }

      await existingUser.save();

      return existingUser.favorites;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
