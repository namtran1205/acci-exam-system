import express from "express";
import {
  getExtensionController,
  postExtensionController,
} from "../controllers/extensions.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router
  .route("/")
  .get(authenticate(), getExtensionController)
  .post(authenticate("acceptance"), postExtensionController);

export { router as extensionRouter };
