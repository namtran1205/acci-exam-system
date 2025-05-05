import * as pg from "drizzle-orm/pg-core";
import { bills } from "./bill";
import { enrollments } from "./enrollment";
import { proofs } from "./proof";

/**
 * Represents an extension of the enrollment ticket.
 *
 * Relationships:
 * - A ticket may have 0-2 extensions.
 * - An extension is only bound to one ticket.
 * - An extension may contain proof or billing information, depending on
 * whether it is a special extension or a non-special one.
 */
export const extensions = pg.pgTable("extensions", {
  id: pg.serial().primaryKey(),
  enrollmentId: pg
    .integer("enrollment_id")
    .references(() => enrollments.id)
    .notNull(),
  proofId: pg.integer("proof_id").references(() => proofs.id),
  billId: pg.integer("bill_id").references(() => bills.id),
  createdAt: pg.timestamp().defaultNow(),
});
