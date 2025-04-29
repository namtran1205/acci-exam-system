import cors from "cors";
import "dotenv/config";
import express, { json, urlencoded } from "express";
import { mainRouter } from "./routers/main.router";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(mainRouter);

export default app;
