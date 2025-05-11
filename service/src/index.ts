import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// express çağırılır.
const app = express();
// middlewares
dotenv.config();
// port belirlenir.
const port = (process.env.PORT as string) || 3000;
// gelen isteklere cevap verme
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Veritabanına bağlanıldı ✔✔✔"))
  .catch((err) => console.log("Veritabanına bağlanamadı 💣💣💣", err));

// portun dinlenmesi
app.listen(port, () => {
  console.log("Server is runnig on port", port);
});
