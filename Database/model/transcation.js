import mongoose from "mongoose";
import { transcationSchema } from "../schema/transcation.js";

export const TranscationModel = new mongoose.model(
  "Transcation",
  transcationSchema
);
