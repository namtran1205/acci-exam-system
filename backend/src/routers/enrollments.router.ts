import express from "express";
import { getEnrollmentsController } from "../controllers/enrollments.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate(), getEnrollmentsController);

export { router as enrollmentsRouter };
