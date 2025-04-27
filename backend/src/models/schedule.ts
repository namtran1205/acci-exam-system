import * as pg from "drizzle-orm/pg-core";

/**
 * Represents an examination schedule, this includes the subject and the price.
 */
export const schedules = pg.pgTable("schedule", {
  id: pg.serial().primaryKey(),
  startTime: pg.timestamp().notNull(),
  endTime: pg.timestamp().notNull(),
  location: pg.text().notNull(),
  name: pg.text().notNull(),
  price: pg.doublePrecision().notNull(),
});
