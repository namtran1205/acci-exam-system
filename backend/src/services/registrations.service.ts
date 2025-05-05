import { asc, eq } from "drizzle-orm";
import db from "../db/connection";
import { customers } from "../models/customer";
import { registrations } from "../models/registration";

export async function getAllRegistrations() {
  return db
    .select()
    .from(registrations)
    .innerJoin(customers, eq(registrations.customerId, customers.id))
    .orderBy(asc(registrations.id));
}

export async function saveRegistration(data: { customerId: number; billId?: number }) {
  return db.insert(registrations).values(data).returning();
}
