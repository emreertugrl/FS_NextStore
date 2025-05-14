import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// Middleware importu
import authRoutes from "./modules/auth/auth.routes.ts";
import productRoute from "./modules/product/product.routes.ts";
import categoryRoute from "./modules/category/category.routes.ts";
import errorMiddleware from "./modules/middleware/errorHandler.ts";
// Route modüllerinin importu

// ortam değişkeni
dotenv.config();

// express çağırılır.
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // her yerden erişebilir
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true, // cookie'leri client'e gönderir
  })
);
app.use(cookieParser());

// port belirlenir.
const port = (process.env.PORT as string) || 3000;

// mongodb bağlanma noktası
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Veritabanına bağlanıldı ✔✔✔"))
  .catch((err) => console.log("Veritabanına bağlanamadı 💣💣💣", err.message));

// gelen isteklere cevap verme
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!!");
});

// Uygulama routeları
app.use("/auth", authRoutes);
app.use("/product", productRoute);
app.use("/category", categoryRoute);

// Sunucu durumu kontrol rotası (health check)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    message: "Sunucu çalışıyor. Sunucu zamanı: " + new Date().toISOString(),
  });
});

// Hata Middleware
app.use(errorMiddleware);

// portun dinlenmesi
app.listen(port, () => {
  console.log("Server is runnig on port", port);
});
