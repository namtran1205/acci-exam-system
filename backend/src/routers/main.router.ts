import express from "express";
import { accountsRouter } from "./accounts.router";
import { enrollmentsRouter } from "./enrollments.router";
import { profilesRouter } from "./profiles.router";

const router = express.Router();

router.use("/", accountsRouter);
router.use("/profiles", profilesRouter);
router.use("/enrollments", enrollmentsRouter);

export { router as mainRouter };
