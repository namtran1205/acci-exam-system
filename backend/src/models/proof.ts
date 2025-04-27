import * as pg from "drizzle-orm/pg-core";

/**
 * Represents a proof table for the special extension type. Includes the type of the proof,
 * and the details of the proof.
 */
export const proofs = pg.pgTable("proof", {
  id: pg.serial().primaryKey(),
  type: pg.text().notNull(),
  details: pg.text().notNull(),
});
