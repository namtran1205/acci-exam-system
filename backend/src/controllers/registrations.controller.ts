import expressAsyncHandler from "express-async-handler";
import { getAllRegistrations } from "../services/registrations.service";
import { saveRegistration } from "../services/registrations.service";

export const getRegistrationsController = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json(await getAllRegistrations());
});

export const saveRegistrationController = expressAsyncHandler(async (req, res, next) => {
  const { customerId, billId } = req.body;

  if (!customerId) {
    res.status(400).json({ error: "Customer ID is required" });
    return;
  }

  const newRegistration = await saveRegistration({ customerId, billId: billId ?? null });
  res.status(201).json({ id: newRegistration[0].id });
});
