import { asc, eq, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { enrollments } from "../models/enrollment";
import { schedules } from "../models/schedule";

/**
 * Retrieves a list of schedules.
 *
 * @param page the page to retrieve
 * @returns a list of schedules
 */
export async function getSchedules(page: number = 1) {
  const results = await db
    .select({
      id: schedules.id,
      name: schedules.name,
      startTime: schedules.startTime,
      endTime: schedules.endTime,
      location: schedules.location,
      price: schedules.price,
      count: sql`count(distinct ${enrollments.id})`,
      slots: schedules.slots,
    })
    .from(schedules)
    .leftJoin(enrollments, eq(enrollments.scheduleId, schedules.id))
    .orderBy(asc(schedules.startTime))
    .groupBy(
      schedules.id,
      schedules.name,
      schedules.startTime,
      schedules.endTime,
      schedules.location,
      schedules.price,
      schedules.slots,
    )
    .offset((page - 1) * 5)
    .limit(5);

  const total = await db.$count(schedules);

  return {
    total: total,
    totalPages: Math.ceil(total / 5),
    page,
    results,
  };
}

/**
 * Retrieves the schedule by an ID.
 *
 * @param id the schedule id
 * @returns the results array
 */
export async function getSchedule(id: number) {
  return await db
    .select({
      id: schedules.id,
      name: schedules.name,
      startTime: schedules.startTime,
      endTime: schedules.endTime,
      location: schedules.location,
      price: schedules.price,
      count: sql<number>`count(distinct ${enrollments.id})`,
      slots: schedules.slots,
    })
    .from(schedules)
    .leftJoin(enrollments, eq(enrollments.scheduleId, schedules.id))
    .where(eq(schedules.id, id))
    .orderBy(asc(schedules.startTime))
    .groupBy(
      schedules.id,
      schedules.name,
      schedules.startTime,
      schedules.endTime,
      schedules.location,
      schedules.price,
      schedules.slots,
    )
    .limit(1);
}

/**
 * Creates a schedule.
 *
 * @param data the data object containing a schedule
 * @returns the creation result
 */
export async function createSchedule(data: {
  name: string;
  startTime: Date;
  endTime: Date;
  location: string;
  price: number;
  slots: number;
}) {
  return await db.insert(schedules).values(data);
}

/**
 * Edits a schedule.
 *
 * @param data the data object containing a whole schedule
 * @returns the editing result
 */
export async function editSchedule(data: {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  location: string;
  price: number;
  slots: number;
}) {
  return await db
    .update(schedules)
    .set({
      name: data.name,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      price: data.price,
      slots: data.slots,
    })
    .where(eq(schedules.id, data.id));
}
