import { Router } from "express";
import {
  deleteAllTranscations,
  searchTranscation,
  transcationStatistics,
  barChartRange,
  getAllTranscationInfo,
  pieChartOfTranscation,
} from "../Controller/transcations.js";

export const transcationRoute = Router();

transcationRoute.get("/", searchTranscation);
transcationRoute.delete("/", deleteAllTranscations);
transcationRoute.get("/statistics", transcationStatistics);
transcationRoute.get("/barchart", barChartRange);
transcationRoute.get("/piechart", pieChartOfTranscation);
transcationRoute.get("/allInfo", getAllTranscationInfo);
