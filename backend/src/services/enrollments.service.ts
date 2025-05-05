import { asc, eq } from "drizzle-orm";
import { db } from "../db/connection";
import { certificates } from "../models/certificate";
import { customers } from "../models/customer";
import { enrollments } from "../models/enrollment";
import { participants } from "../models/participant";
import { registrations } from "../models/registration";
import { results } from "../models/result";
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
      .innerJoin(registrations, eq(registrations.id, participants.registrationId))
      .innerJoin(customers, eq(customers.id, registrations.customerId))
      .leftJoin(results, eq(results.enrollmentId, enrollments.id))
      .leftJoin(certificates, eq(results.certificateId, certificates.id))
      .orderBy(asc(enrollments.id))
      .offset((page - 1) * 5)
      .limit(5),
  };
}

/**
 * Post a score result on an enrollment.
 *
 * @param data The results data
 * @returns the transaction result
 */
export async function putResultsOnEnrollment(data: {
  id: number;
  score: number;
  certificate?: string;
}) {
  return await db.transaction(async (tx) => {
    if ((await tx.select().from(enrollments).where(eq(enrollments.id, data.id))).length == 0) {
      tx.rollback();
      return 404;
    }

    let certId: number | undefined = undefined;

    const foundResult = await tx
      .select()
      .from(results)
      .innerJoin(enrollments, eq(enrollments.id, results.enrollmentId))
      .where(eq(enrollments.id, data.id))
      .limit(1);

    // ADd a certificate if available.
    if (foundResult.length > 0 && data.certificate) {
      // First, we check if there's a certificate bound to this yet. If there is,
      // we just update that record.

      const cert = await tx
        .insert(certificates)
        .values({ name: data.certificate, received: false })
        .returning();

      if (cert.length == 0) {
        tx.rollback();
        return 500;
      }

      certId = cert[0].id;
    }

    // New let's create.
    if (foundResult.length == 0) {
      await tx.insert(results).values({
        enrollmentId: data.id,
        result: data.score,
        certificateId: certId,
      });
      return 201;
    } else {
      await tx
        .update(results)
        .set({
          result: data.score,
          certificateId: certId,
        })
        .where(eq(results.enrollmentId, data.id));
      return 200;
    }
  });
}


/**
 * @Update the enrollents based on the new schedule and make it in pending status.
 * @param enrollmentId The enrollment ID to update
 * @param scheduleId The new schedule ID to set
 * */

export async function updateEnrollmentSchedule(
  enrollmentId: number,
  scheduleId: number
) {
  await db.update(enrollments).set({
    scheduleId: scheduleId,
    state: "pending",
  }).where(eq(enrollments.id, enrollmentId));
}

