import * as pg from "drizzle-orm/pg-core";
import { registrations } from "./registration";

/**
 * Represents some simple choices of a person's gender. Males and females have no need to be discussed.
 * Non binaries are for inclusivity reasons and idiot is reserved especially for Phúc An.
 */
export const genders = pg.pgEnum("genders", ["male", "female", "nonbinary", "idiot"]);

/**
 * Represents a participant within an examination registration. The same participant can be duplicate
 * on different registrations.
 *
 * Relationships:
 * - An exam registration contains zero or many participants.
 * - A participant only belongs to one exam registration.
 * - A participant contains zero or many enrollments.
 */
export const participants = pg.pgTable("participants", {
  id: pg.serial().primaryKey(),
  name: pg.text().notNull(),
  dateOfBirth: pg.date().notNull(),
  gender: genders().notNull().default("idiot"),
  registrationId: pg.integer("registration_id").references(() => registrations.id),
});
