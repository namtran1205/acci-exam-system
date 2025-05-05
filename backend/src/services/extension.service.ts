import { asc, eq } from "drizzle-orm";
import { db } from "../db/connection";
import { extensions } from "../models/extension";
import { proofs } from "../models/proof";

/**
 * Insert a special extension into the database.
 * @param enrollmentId
 * @param proofType
 * @param proofInfo
 * @returns
 */
export async function saveSpecialExtension(
  enrollmentId: number,
  proofType: string,
  proofInfo: string,
) {
  const proofId = await db
    .insert(proofs)
    .values({
      type: proofType,
      details: proofInfo,
    })
    .returning();

  return await db.insert(extensions).values({
    enrollmentId: enrollmentId,
    proofId: proofId[0].id,
  });
}

/**
 * Counts the number of extensions for an enrollment.
 *
 * @param enrollmentId the enrollment ID
 * @returns the count
 */
export async function getExtensions(enrollmentId: number) {
  return await db
    .select({
      id: extensions.id,
      createdAt: extensions.createdAt,
      proofType: proofs.type,
    })
    .from(extensions)
    .leftJoin(proofs, eq(proofs.id, extensions.proofId))
    .orderBy(asc(extensions.id))
    .where(eq(extensions.enrollmentId, enrollmentId));
}

/**
 * Saves an extension.
 *
 * @param enrollmentId the enrollment ID
 * @param proofType the proof type, if available
 * @param proofInfo the proof info, if available
 * @returns the extension creation result
 */
export async function saveExtension(enrollmentId: number, proofType?: string, proofInfo?: string) {
  if (proofType && proofInfo) {
    const proofId = await db
      .insert(proofs)
      .values({
        type: proofType,
        details: proofInfo,
      })
      .returning();

    return await db.insert(extensions).values({
      enrollmentId: enrollmentId,
      proofId: proofId[0].id,
    });
  } else {
    return await db.insert(extensions).values({
      enrollmentId: enrollmentId,
    });
  }
}
