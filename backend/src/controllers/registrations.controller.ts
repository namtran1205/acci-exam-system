import expressAsyncHandler from "express-async-handler";
import { getAllRegistrations } from "../services/registrations.service";

export const getRegistrationsController = expressAsyncHandler(async (req, res) => {
  res.status(200).json(await getAllRegistrations());
});
