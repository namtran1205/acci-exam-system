import "dotenv/config";
import express from "express";
import { mainRouter } from "./routers/main.router";

const app = express();

app.use(mainRouter);

export default app;
