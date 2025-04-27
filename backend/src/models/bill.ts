import * as pg from "drizzle-orm/pg-core";

/**
 * Represents a general-purpose bill, holding the lump sum that's confirmed after any
 * discounts or upsells, with the information field holding data about what was this bill for.
 */
export const bills = pg.pgTable("bills", {
  id: pg.serial().primaryKey(),
  amount: pg.doublePrecision().notNull(),
  details: pg.text().notNull(),
});
