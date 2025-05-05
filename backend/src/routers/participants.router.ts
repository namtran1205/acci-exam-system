import express from "express";
import {
  getParticipantController,
  saveParticipantController,
} from "../controllers/participants.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate("acceptance"), getParticipantController);
router.post("/save", saveParticipantController);

export { router as participantsRouter };
