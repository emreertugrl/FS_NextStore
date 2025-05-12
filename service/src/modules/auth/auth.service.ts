import bcrypt from "bcryptjs";
import { UserRegisterDto } from "./auth.dto.ts";
import User from "./auth.model.ts";

class AuthService {
  static async register(userData: UserRegisterDto) {
    try {
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { username: userData.username }],
      });
      if (existingUser) {
        throw new Error("Invalid credentials");
      }
      let hashedPassword = "";
      try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(userData.password, salt);
      } catch (error) {
        throw new Error("Password hashing failed");
      }
      const user = new User({ ...userData, password: hashedPassword });
      await user.save();
      const { password, __v, ...userWithoutPassword } = user.toObject();
      return { ...userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
