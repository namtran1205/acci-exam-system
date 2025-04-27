import { Pool } from "pg";
import * as billSchema from "../models/bill";
import * as certificateSchema from "../models/certificate";
import * as customerSchema from "../models/customer";
import * as employeeSchema from "../models/employee";
import * as enrollmentSchema from "../models/enrollment";
import * as extensionSchema from "../models/extension";
import * as participantSchema from "../models/participant";
import * as proofSchema from "../models/proof";
import * as registrationSchema from "../models/registration";
import * as resultSchema from "../models/result";
import * as scheduleSchema from "../models/schedule";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_CONNECTION,
      idleTimeoutMillis: 3000,
    });

    const client = await pool.connect();
    console.log("Database connection successful!");
    client.release();
    return drizzle(pool, { schema: { ...billSchema, ...certificateSchema, ...customerSchema, ...employeeSchema, ...enrollmentSchema, ...extensionSchema, ...participantSchema, ...proofSchema, ...registrationSchema, ...resultSchema, ...scheduleSchema } });
  } catch (err) {
    console.error("Error connecting to the database:", err);
    return null; // Return null if connection fails
  }
};

export default db;