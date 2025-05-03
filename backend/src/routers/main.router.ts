import express from "express";
import { accountsRouter } from "./accounts.router";
import { customersRouter } from "./customers.router";
import { enrollmentsRouter } from "./enrollments.router";
import { profilesRouter } from "./profiles.router";
import { registrationsRouter } from "./registrations.router";
import { schedulesRouter } from "./schedules.router";

const router = express.Router();

router.use("/", accountsRouter);
router.use("/profiles", profilesRouter);
router.use("/enrollments", enrollmentsRouter);
router.use("/customers", customersRouter);
router.use("/registrations", registrationsRouter);
router.use("/schedules", schedulesRouter);

export { router as mainRouter };
