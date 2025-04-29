import express from "express";
import { getProfileController } from "../controllers/profiles.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.route("/").get(authenticate(), getProfileController);

export { router as profilesRouter };
