import * as pg from "drizzle-orm/pg-core";

/**
 * Represents a certificate that can be received with the examination results.
 */
export const certificates = pg.pgTable("certificates", {
  id: pg.serial().primaryKey(),
  name: pg.text().notNull(),
  received: pg.boolean().notNull().default(false),
});
