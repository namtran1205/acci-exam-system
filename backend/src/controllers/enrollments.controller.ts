import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { getEnrollments } from "../services/enrollments.service";

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
