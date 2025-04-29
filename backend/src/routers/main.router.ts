import express from "express";
import { accountsRouter } from "./accounts.router";
import { profilesRouter } from "./profiles.router";

const router = express.Router();

router.use("/", accountsRouter);
router.use("/profiles", profilesRouter);

export { router as mainRouter };
