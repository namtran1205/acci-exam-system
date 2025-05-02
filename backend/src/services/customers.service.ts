import { asc } from "drizzle-orm";
import { db } from "../db/connection";
import { customers } from "../models/customer";

export async function getAllCustomers() {
  return db.select().from(customers).orderBy(asc(customers.id));
}

export async function createCustomer(query: {
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: "individual" | "organization";
}) {
  return db.insert(customers).values({
    name: query.name,
    email: query.email,
    phone: query.phone,
    address: query.address,
    role: query.role,
  });
}
