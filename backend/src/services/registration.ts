import {lt} from "drizzle-orm";
import db from "../db/connection";
import {registrations } from "../models/registration";

/**
 * Fetch all customers from the database using cursor-based pagination.
 *
 * @param {number} pagesize - Number of registrations per page. Default is 5.
 * @returns {Promise<unknown[]>} A promise that resolves to an array of all registrations.
 */
export async function getAllRegistration(pagesize: number = 5) {
    let lastId: number | null = null;
    let result: unknown[] = [];
    while (true) {
        const query = lastId === null
            ? await db.select().from(registrations).orderBy(registrations.id).limit(pagesize)
            : await db.select().from(registrations).where(lt(registrations.id, lastId)).orderBy(registrations.id).limit(pagesize);
        if (query.length === 0) {
            break;
        }
        result = [...result, ...query];
        lastId = query[query.length - 1].id;
    }
    return result;
}