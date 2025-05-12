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
}

export default AuthService;
