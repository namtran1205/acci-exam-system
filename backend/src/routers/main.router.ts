import express from "express";
import { accountsRouter } from "./accounts.router";

const router = express.Router();

router.use("/", accountsRouter);

export { router as mainRouter };
