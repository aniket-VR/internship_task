import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { transcationRoute } from "./Routes/transcations.js";
import { initializeDBRoute } from "./Routes/initializeDatabase.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database Connected");
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/transcation", transcationRoute);
app.use("/initializeDB", initializeDBRoute);
app.listen(process.env.PORT, () => {
  console.log("server started");
});
