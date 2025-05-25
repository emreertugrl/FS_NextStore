import mongoose, { model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Kullanıcı interface'ı
interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profileImage: string;
  refreshToken: string;
  favorites: [{ type: mongoose.Schema.Types.ObjectId; ref: "Product" }];
  comparePassword(candidatePassword: string): Promise<boolean>;
}
// Kullanıcı şeması
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "User" },
    refreshToken: {
      type: String,
      default: null,
    },
    profileImage: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true, // Yaratılma ve güncellenme zamanlarını otomatik ekler
  }
);

// Şifre karşılaştırma metodu
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Şifreyi hash'leme
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: unknown) {
    // Error'ı doğru şekilde tipliyoruz
    if (error instanceof Error) {
      next(error); // Error'ı `Error` tipinde kabul ederiz
    } else {
      // Error bir `Error` değilse, genel bir hata mesajı atıyoruz
      next(new Error("Şifre hash'leme sırasında bir hata oluştu"));
    }
  }
});

const User = model<IUser>("User", userSchema);

export default User;
