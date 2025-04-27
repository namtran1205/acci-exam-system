import { sql } from "drizzle-orm";
import * as pg from "drizzle-orm/pg-core";

/**
 * The enumeration for employee types, for splitting routes at main page.
 */
export const employeeRoles = pg.pgEnum("employee_role", [
  "acceptance",
  "accounting",
  "data",
  "admin",
]);

/**
 * The employees table. Includes a username and a password for employees to login before working,
 * a name for displaying purposes and their role.
 */
export const employees = pg.pgTable(
  "employee",
  {
    id: pg.serial().primaryKey(),
    username: pg.varchar({ length: 32 }).notNull(),
    password: pg.text().notNull(),
    name: pg.text().notNull(),
    role: employeeRoles().notNull(),
  },
  (self) => [
    {
      username_idx: pg.uniqueIndex().on(sql`lower(${self.username})`),
    },
  ],
);
