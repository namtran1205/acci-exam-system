import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { createSchedule, getSchedules } from "../services/schedules.service";

/**
 * GET /schedules: Retrieves schedules with pagination.
 *
 * - Accepts query (page).
 */
export const getSchedulesController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    page: z.coerce.number().default(1),
  });

  const query = schema.safeParse(req.query);
  if (query.error) {
    res.status(400).json({ message: "Schema error for query" });
    return;
  }

  res.status(200).json(await getSchedules(query.data.page));
});

/**
 * POST /schedules: Create a new schedule.
 */
export const postSchedulesController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    name: z.string(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    location: z.string(),
    price: z.coerce.number().min(0),
    slots: z.coerce.number().min(1),
  });
  console.log(req.body);

  const body = schema.safeParse(req.body);
  if (body.error) {
    res.status(400).json({ message: "Invalid body form" });
    return;
  }

  await createSchedule({
    ...body.data,
    startTime: new Date(body.data.startTime),
    endTime: new Date(body.data.endTime),
  });
  res.status(201).json({});
});
