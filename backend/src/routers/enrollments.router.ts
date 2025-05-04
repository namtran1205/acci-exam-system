import express from "express";
import {
  getEnrollmentsController,
  postEnrollmentResultController,
} from "../controllers/enrollments.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate(), getEnrollmentsController);
router.post("/result", authenticate("data"), postEnrollmentResultController);

export { router as enrollmentsRouter };
