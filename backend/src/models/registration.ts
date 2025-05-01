import * as pg from "drizzle-orm/pg-core";
import { bills } from "./bill";
import { customers } from "./customer";

/**
 * Represents a single examination registration.
 *
 * Relationships:
 * - One customer may have multiple registrations (multiple sessions).
 * - One registration may have zero or one bill.
 *
 * Computations:
 * - If the `updatedAt` field is 3-days old, and `billId` is still null, this is cancelled.
 * - If the `billId` is not null, this is successful.
 * - If the `billId` is null, this is pending.
 */
export const registrations = pg.pgTable("registrations", {
  id: pg.serial().primaryKey(),
  updatedAt: pg.timestamp().notNull().defaultNow(),
  customerId: pg.integer("customer_id").references(() => customers.id),
  billId: pg.integer("bill_id").references(() => bills.id),
});
