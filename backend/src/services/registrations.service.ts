import { asc, eq } from "drizzle-orm";
import db from "../db/connection";
import { customers } from "../models/customer";
import { registrations } from "../models/registration";

export async function getAllRegistrations() {
  const regs = await db
    .select({
      registrations,
      customer: customers,
    })
    .from(registrations)
    .innerJoin(customers, eq(registrations.customerId, customers.id))
    .orderBy(asc(registrations.id));
  return regs;
}

export async function saveRegistration(data: { customerId: number; billId?: number }) {
  return db.insert(registrations).values(data).returning();
}
