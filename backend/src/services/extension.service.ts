import { proofs } from "../models/proof";
import {extensions} from "../models/extension";
import { db } from "../db/connection";


/**
 * Insert a special extension into the database.
 * @param enrollmentId 
 * @param proofType 
 * @param proofInfo 
 * @returns 
 */
export async function saveSpecialExtension (
    enrollmentId: number,
    proofType: string,
    proofInfo: string,
) {
    const proofId = await db.insert(proofs).values({
        type: proofType,
        details: proofInfo
    }).returning()

    return await db.insert(extensions).values({
        enrollmentId: enrollmentId,
        proofId: proofId[0].id,
    })
}