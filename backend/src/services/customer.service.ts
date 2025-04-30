import {eq,lt} from "drizzle-orm";
import db from "../db/connection";
import {customers} from "../models/customer";
import {registrations} from "../models/registration";

/**
 * Fetch all customers from the database using cursor-based pagination.
 *
 * @param {number} pagesize - Number of customers per page. Default is 5.
 * @returns {Promise<unknown[]>} A promise that resolves to an array of all customers.
 */
export async function getAllCustomers(pagesize: number = 5) {
    let lastId: number | null = null;
    let result: unknown[] = [];
    while (true) {
        const query = lastId === null
            ? await db.select().from(customers).orderBy(customers.id).limit(pagesize)
            : await db.select().from(customers).where(lt(customers.id, lastId)).orderBy(customers.id).limit(pagesize);
        if (query.length === 0) {
            break;
        }
        result = [...result, ...query];
        lastId = query[query.length - 1].id;
    }
    return result;
}

/**
 * Save a new customer into the database and create an associated registration record.
 *
 * @param {string} name - The customer's name.
 * @param {string} email - The customer's email.
 * @param {string} phone - The customer's phone number.
 * @param {string} address - The customer's address.
 * @param {customer_role} role - The customer's role: either 'individual' or 'organization'.
 * @returns {Promise<[object, object]>} A promise that resolves to an array containing the saved customer and registration objects.
 */
type customer_role = "individual" | "organization";
export async function saveCustomer(name: string, email: string, phone: string, address: string, role: customer_role) {
    const customer = (await db.insert(customers).values({ name, email, phone, address, role }).returning({id: customers.id}))[0];
    const registration = await db.insert(registrations).values({customerId: customer.id, updatedAt: new Date(), billId: undefined});
    return [customer, registration];
}

/**
 * Update a customer's information in the database.
 *
 * @param {number} id - The customer's ID.
 * @param {string} name - The updated name.
 * @param {string} email - The updated email.
 * @param {string} phone - The updated phone number.
 * @param {string} address - The updated address.
 * @returns {Promise<object>} A promise that resolves to the updated customer object.
 */
export async function updateCustomer(id: number, name: string, email: string, phone: string, address: string) {
    return (await db.update(customers).set({ name, email, phone, address }).where(eq(customers.id, id)).returning({ id: customers.id }))[0];
}

/**
 * Delete a customer and their associated registration from the database.
 *
 * @param {number} id - The customer's ID.
 * @returns {Promise<[object, object]>} A promise that resolves to an array containing the deleted customer and registration objects.
 */
export async function deleteCustomer(id: number) {
    const customer = (await db.delete(customers).where(eq(customers.id, id)).returning({ id: customers.id }))[0];
    const registration = (await db.delete(registrations).where(eq(registrations.customerId, customer.id)).returning())[0];
    return [customer, registration];
}



