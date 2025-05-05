import express from "express";
import { getRegistrationsController } from "../controllers/registrations.controller";
import { saveRegistrationController } from "../controllers/registrations.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate("acceptance"), getRegistrationsController);

router.post("/save", saveRegistrationController);

export { router as registrationsRouter };
