import { db } from "./connection";

/**
 * Truncate a table, while also restarting the identity and cascading to
 * all related tables.
 *
 * @param name The table name to truncate
 */
export async function truncateTable(name: string) {
  await db.execute(`truncate table \"${name}\" restart identity cascade`);
}
