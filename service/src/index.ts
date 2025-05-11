import express from "express";
// express çağırılır.
const app = express();
// port belirlenir.
const port = process.env.PORT || 3000;
// gelen isteklere cevap verme
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// portun dinlenmesi
app.listen(port, () => {
  console.log("Server is runnig on port", port);
});
