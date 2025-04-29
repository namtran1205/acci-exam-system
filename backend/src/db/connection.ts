import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION,
  max: 10,
});

/**
 * The database constant for querying Postgres using a pool of connections.
 *
 * If there is no available connection for you, you must wait until there is.
 */
export const db = drizzle({
  client: pool,
});

export default db;
