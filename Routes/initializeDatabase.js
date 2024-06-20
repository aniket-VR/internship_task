import { Router } from "express";
import { initializeDB } from "../Controller/initializeDatabase.js";
export const initializeDBRoute = Router();
initializeDBRoute.get("/", initializeDB);
