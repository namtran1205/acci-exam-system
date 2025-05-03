import express from "express";
import {
  getSchedulesController,
  postSchedulesController,
} from "../controllers/schedules.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate("acceptance"), getSchedulesController);
router.post("/", authenticate("acceptance"), postSchedulesController);

export { router as schedulesRouter };
