export default class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Stack trace doğru şekilde çıksın diye
    Error.captureStackTrace(this, this.constructor);
  }
}

// Kullanımı
// import AppError from "../utils/AppError";
// if (!email || !password) {
//   throw new AppError("Email ve şifre zorunludur", 400);
// }
