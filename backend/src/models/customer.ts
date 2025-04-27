import { sql } from "drizzle-orm";
import * as pg from "drizzle-orm/pg-core";

/**
 * For splitting customer roles on screen. As an individual need not an address but
 * an organization does.
 */
export const customerRoles = pg.pgEnum("customer_role", ["individual", "organization"]);

/**
 * Represents a customer. An organization will have the address field, an individual will not.
 */
export const customers = pg.pgTable(
  "customer",
  {
    id: pg.serial().primaryKey(),
    name: pg.text().notNull(),
    phone: pg.varchar({ length: 20 }).notNull(),
    email: pg.text().notNull(),
    address: pg.text(),
    role: customerRoles().notNull(),
  },
  (self) => [
    {
      email_idx: pg.uniqueIndex().on(sql`lower(${self.email})`),
    },
  ],
);
