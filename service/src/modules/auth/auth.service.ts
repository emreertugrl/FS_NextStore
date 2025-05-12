import { UserRegisterDto } from "./auth.dto.ts";
import User from "./auth.model.ts";
import jwt from "jsonwebtoken";

class AuthService {
  // Create Access Token
  static async generateAccessToken(user: { _id: string; email: string; role: string }) {
    const payload: { userId: string; email: string; role: string } = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_SECRET_EXPIRE });
  }

  // Create Refresh Token
  static async generateRefreshToken(user: { _id: string }) {
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
}

export default AuthService;
