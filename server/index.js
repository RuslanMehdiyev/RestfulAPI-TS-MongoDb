const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const productRouter = require("./routes/productsRoutes");

app.use(express.json());
// app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://RuslanMehdiyev:daqestan001@cluster0.rkskyqr.mongodb.net/code_academyDB"
  )
  .then((res) => {
    console.log("Connect!");
  })
  .catch((err) => {
    console.log("error: ", err);
  });

app.use("/products", productRouter);

app.listen(PORT);
