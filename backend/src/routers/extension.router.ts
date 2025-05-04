import {postSpecialExtensionController} from "../controllers/entension.controller";
import express from "express";

const router = express.Router();

router.post("/", postSpecialExtensionController);

export { router as extensionRouter };   