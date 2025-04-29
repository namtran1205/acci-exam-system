import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { json, urlencoded } from "express";
import { mainRouter } from "./routers/main.router";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(mainRouter);

export default app;
