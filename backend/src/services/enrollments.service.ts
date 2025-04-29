import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { enrollments } from "../models/enrollment";
import { participants } from "../models/participant";
import { schedules } from "../models/schedule";

/**
 * Retrieves a list of enrollments, paged.
 *
 * @param page The page number, offset at 1
 * @returns A list of all enrollments within the database
 */
export async function getEnrollments(page: number = 1) {
  const total = await db.$count(enrollments);

  return {
    total,
    totalPages: Math.ceil(total / 5),
    page,
    results: await db
      .select()
      .from(enrollments)
      .innerJoin(participants, eq(enrollments.participantId, participants.id))
      .innerJoin(schedules, eq(schedules.id, enrollments.scheduleId))
      .offset((page - 1) * 5)
      .limit(5),
  };
}
