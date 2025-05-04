import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { getEnrollments, putResultsOnEnrollment } from "../services/enrollments.service";

/**
 * GET /enrollments: Retrieves a list of enrollments, paged.
 *
 * - Requires authentication.
 * - Accepts query:
 *   - page (number): default to 1.
 */
export const getEnrollmentsController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    page: z.coerce.number().default(1),
  });

  const query = schema.safeParse(req.query);
  if (query.error) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  res.status(200).json(await getEnrollments(query.data.page));
});

/**
 * POST /enrollments/result: Post a result up to an enrollment.
 */
export const postEnrollmentResultController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    id: z.coerce.number().min(1),
    score: z.coerce.number().min(0),
    certificate: z.string().optional(),
  });

  const body = schema.safeParse(req.body);
  if (body.error) {
    res.status(400).json({ message: "Invalid body" });
    return;
  }

  const txResult = await putResultsOnEnrollment({
    id: body.data.id,
    certificate: body.data.certificate,
    score: body.data.score,
  });
  res.status(txResult).json({});
});
