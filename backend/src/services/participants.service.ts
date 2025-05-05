import { asc, eq, sql } from "drizzle-orm";
import db from "../db/connection";
import { enrollments } from "../models/enrollment";
import { participants } from "../models/participant";

export async function saveParticipant(data: {
  name: string;
  dateOfBirth: string;
  gender: "male" | "female" | "nonbinary" | "idiot";
  registrationId: number;
}) {
  return db.insert(participants).values(data).returning();
}

export async function getParticipants(registration: number) {
  return db
    .select({
      id: participants.id,
      name: participants.name,
      dateOfBirth: participants.dateOfBirth,
      gender: participants.gender,
      examinations: sql`count(${enrollments.id})`,
    })
    .from(participants)
    .innerJoin(enrollments, eq(enrollments.participantId, participants.id))
    .groupBy(participants.id, participants.name, participants.dateOfBirth, participants.gender)
    .where(eq(participants.registrationId, registration))
    .orderBy(asc(participants.id));
}
