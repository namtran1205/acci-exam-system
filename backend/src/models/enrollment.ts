import * as pg from "drizzle-orm/pg-core";
import { participants } from "./participant";
import { schedules } from "./schedule";

/**
 * Represents the state of an enrollment ticket.
 *
 * A pending ticket means that they are waiting for the examination number.
 * A cancelled ticket means that the ticket is already cancelled, no need for numbering.
 */
export const enrollmentStates = pg.pgEnum("enrollment_states", ["pending", "cancelled"]);

/**
 * Represents an enrollment ticket. This only comes into effect after exam registration
 * is completed in the database sense.
 *
 * Relationships:
 * - One participant may have multiple enrollment tickets, as one participant can participate in multiple exams.
 * - Each enrollment is only bound to a single exam schedule.
 */
export const enrollments = pg.pgTable("enrollments", {
  id: pg.serial().primaryKey(),
  scheduleId: pg.serial("schedule_id").references(() => schedules.id),
  participantId: pg.serial("participant_id").references(() => participants.id),
  number: pg.text(),
  state: enrollmentStates().notNull().default("pending"),
});
