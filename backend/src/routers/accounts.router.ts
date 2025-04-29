import express from "express";
import { loginController, logoutController } from "../controllers/accounts.controller";

const router = express.Router();

router.post("/login", loginController);
router.get("/logout", logoutController);

export { router as accountsRouter };
