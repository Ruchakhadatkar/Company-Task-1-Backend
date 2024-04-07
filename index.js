const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const userRoutes = require("./routes/userRoutes")


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// app.use("/api/user", userRoutes);

app.use("/api/user", userRoutes)


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Server started at port", process.env.PORT);
    });
  })
  .catch(() => {
    console.log(error);
  });
