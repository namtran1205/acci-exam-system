import * as pg from "drizzle-orm/pg-core";
import { certificates } from "./certificate";
import { enrollments } from "./enrollment";

/**
 * Represents the exam results of any participant, using their enrollment tickets.
 */
export const results = pg.pgTable("results", {
  id: pg.serial().primaryKey(),
  enrollmentId: pg
    .serial("enrollment_id")
    .notNull()
    .references(() => enrollments.id),
  result: pg.doublePrecision().notNull(),
  certificateId: pg.serial("certificate_id").references(() => certificates.id),
});
