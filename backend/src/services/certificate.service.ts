import { certificates } from '../models/certificate.ts';
import { asc, eq} from 'drizzle-orm';
import {results} from '../models/result.ts';
import {participants} from '../models/participant.ts';
import {enrollments} from '../models/enrollment.ts';
import {schedules} from '../models/schedule.ts';
import db from '../db/connection.ts';
/** 
* Browse all of the certificates in the database.
* @returns certificates array, participant's information and his exam result.
* @throws Error if the database query fails. 
*/

export async function getAllCertificates() {
    return await db.select({
        certificate_id: certificates.id,
        certificate_status: certificates.received,
        participant_name: participants.name,
        exam_name: schedules.name,
        exam_address: schedules.location
    }).from(certificates).orderBy(asc(certificates.id))
    .innerJoin(results, eq(certificates.id, results.certificateId))
    .innerJoin(enrollments, eq(results.enrollmentId, enrollments.id))
    .innerJoin(participants, eq(enrollments.participantId, participants.id))
    .innerJoin(schedules, eq(enrollments.scheduleId, schedules.id))
}

export async function UpdateCertificateStatus(id: number) {
    return await db.update(certificates).set({received: true}).where(eq(certificates.id, id)).returning();
}
