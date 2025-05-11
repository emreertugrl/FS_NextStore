import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Middleware importu
import authRoutes from "./modules/auth/auth.routes.ts";
// Route modüllerinin importu

// ortam değişkeni
dotenv.config();

// express çağırılır.
const app = express();

// port belirlenir.
const port = (process.env.PORT as string) || 3000;

// mongodb bağlanma noktası
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Veritabanına bağlanıldı ✔✔✔"))
  .catch((err) => console.log("Veritabanına bağlanamadı 💣💣💣", err));

// gelen isteklere cevap verme
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!!");
});

// Uygulama routeları
app.use("/auth", authRoutes);

// Sunucu durumu kontrol rotası (health check)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    message: "Sunucu çalışıyor. Sunucu zamanı: " + new Date().toISOString(),
  });
});

// portun dinlenmesi
app.listen(port, () => {
  console.log("Server is runnig on port", port);
});
