import { Router } from "express";
import { borrowControllers } from "./borrow.controller";

const borrowRoutes = Router();

borrowRoutes.post("/",borrowControllers.borrowBook)
borrowRoutes.get("/",borrowControllers.borrowedBookSummary)

export default borrowRoutes;