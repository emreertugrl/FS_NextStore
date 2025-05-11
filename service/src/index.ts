import express from "express";
import mongoose from "mongoose";

// express çağırılır.
const app = express();
// port belirlenir.
const port = process.env.PORT || 3000;
// gelen isteklere cevap verme
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

mongoose
  .connect("mongodb://localhost:27017/nextStoredb")
  .then(() => console.log("Veritabanına bağlanıldı ✔✔✔"))
  .catch((err) => console.log("Veritabanına bağlanamadı 💣💣💣", err));

// portun dinlenmesi
app.listen(port, () => {
  console.log("Server is runnig on port", port);
});
