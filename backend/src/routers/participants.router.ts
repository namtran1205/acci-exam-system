import express from "express";
import { saveParticipantController } from "../controllers/participants.controller";

const router = express.Router();

router.post("/save", saveParticipantController);

export { router as participantsRouter };
