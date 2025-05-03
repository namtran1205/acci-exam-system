import express from "express";
import {
  getSchedulesController,
  postSchedulesController,
  putSchedulesController,
} from "../controllers/schedules.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate("acceptance"), getSchedulesController);
router.post("/", authenticate("acceptance"), postSchedulesController);
router.put("/", authenticate("acceptance"), putSchedulesController);

export { router as schedulesRouter };
