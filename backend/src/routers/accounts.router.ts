import express from "express";
import { loginController } from "../controllers/accounts.controller";

const router = express.Router();

router.post("/login", loginController);

export { router as accountsRouter };
