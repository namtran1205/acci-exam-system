import "dotenv/config";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const app = express();

app.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
  }),
);

export default app;
