import express from "express";
import {
  getCustomersController,
  postCustomersController,
} from "../controllers/customers.controller";
import { authenticate } from "../middlewares";

const router = express.Router();

router.get("/", authenticate("acceptance"), getCustomersController);
router.post("/", authenticate("acceptance"), postCustomersController);

export { router as customersRouter };
