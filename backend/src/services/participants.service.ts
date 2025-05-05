import db from "../db/connection";
import { participants } from "../models/participant";

export async function saveParticipant(data: {
  name: string;
  dateOfBirth: string;
  gender: "male" | "female" | "nonbinary" | "idiot";
  registrationId: number;
}) {
  return db.insert(participants).values(data).returning();
}
