import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import vansRoutes from "./routes/vans.js";
import hostRoutes from "./routes/hostVans.js"
import userRoutes from "./routes/user.js"

dotenv.config();

// Creating an instance of the express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for handling headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ["*"]);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Setting up routes for different parts of the application
app.use("/api/vans", vansRoutes);
app.use("/api/host/vans", hostRoutes)
app.use("/api/user", userRoutes);

// Connecting to the MongoDB database
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
