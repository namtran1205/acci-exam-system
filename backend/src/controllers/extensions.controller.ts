import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { updateEnrollmentSchedule } from "../services/enrollments.service";
import { getExtensions, saveExtension } from "../services/extension.service";
import { getSchedule } from "../services/schedules.service";

/**
 * GET /extensions?id=: Gets the extensions of an enrollment.
 */
export const getExtensionController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    id: z.coerce.number().min(1),
  });

  const query = schema.safeParse(req.query);
  if (query.error) {
    res.status(400).json({ message: "Invalid query" });
    return;
  }

  res.status(200).json(await getExtensions(query.data.id));
});

/**
 * POST /extensions: Add a new extension to the enrollment.
 */
export const postExtensionController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    enrollmentId: z.coerce.number().min(1),
    proofType: z.string().optional(),
    proofInfo: z.string().optional(),
    scheduleId: z.coerce.number().min(1),
  });

  const body = schema.safeParse(req.body);
  if (body.error) {
    res.status(400).json({ message: "Invalid body" });
    return;
  }

  const schedule = await getSchedule(body.data.scheduleId);
  if (schedule.length == 0) {
    res.status(404).json({ message: "Schedule not found" });
    return;
  }

  if (schedule[0].count == schedule[0].slots) {
    res.status(409).json({ message: "That schedule is already full" });
    return;
  }

  if ((await getExtensions(body.data.enrollmentId)).length >= 2) {
    res
      .status(409)
      .json({ message: "That enrollment already maxes out the number of extensions allowed." });
    return;
  }

  const result = await Promise.all([
    saveExtension(body.data.enrollmentId, body.data.proofType, body.data.proofInfo),
    updateEnrollmentSchedule(body.data.enrollmentId, body.data.scheduleId),
  ]);
  res.status(201).json(result);
});
