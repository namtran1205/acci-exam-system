import { eq, sql } from "drizzle-orm";
import db from "../db/connection";
import { employees } from "../models/employee";

/**
 * Finds an account by the username, limited to 1 account in the array.
 *
 * @param username the username
 * @returns the account array, length 1 if found, empty if not.
 */
export async function findAccountByUsername(username: string) {
  return await db
    .select()
    .from(employees)
    .where(eq(sql`lower(${employees.username})`, username.toLowerCase()))
    .limit(1);
}
