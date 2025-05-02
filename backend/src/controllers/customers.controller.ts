import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { createCustomer, getAllCustomers } from "../services/customers.service";

/**
 * GET /customers: Retrieves all customers logged in the system.
 */
export const getCustomersController = expressAsyncHandler(async (req, res) => {
  res.status(200).json(await getAllCustomers());
});

/**
 * POST /customers: Upload a new customer to the system.
 */
export const postCustomersController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string().optional(),
    role: z.literal("individual").or(z.literal("organization")),
  });

  const body = schema.safeParse(req.body);
  if (body.error) {
    res.status(400).json({ message: "Invalid body" });
    return;
  }

  res.status(201).json(await createCustomer(body.data));
});
