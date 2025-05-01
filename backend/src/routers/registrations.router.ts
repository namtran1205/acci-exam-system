import express from "express";
import { getRegistrationsController } from "../controllers/registrations.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate("acceptance"), getRegistrationsController);

export { router as registrationsRouter };
