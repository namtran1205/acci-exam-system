import expressAsyncHandler from "express-async-handler";
import { getParticipants, saveParticipant } from "../services/participants.service";

/**
 * GET /participants?id=: Gets the participants of a registration.
 */
export const getParticipantController = expressAsyncHandler(async (req, res) => {
  res.status(200).json(await getParticipants(Number(req.query.id ?? "0")));
});

export const saveParticipantController = expressAsyncHandler(async (req, res, next) => {
  const { name, dateOfBirth, gender, registrationId } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!name || !dateOfBirth || !gender || !registrationId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  // Lưu participant vào database
  const newParticipant = await saveParticipant({ name, dateOfBirth, gender, registrationId });

  if (!newParticipant || newParticipant.length === 0) {
    res.status(500).json({ error: "Failed to save participant" });
  }

  res.status(201).json(newParticipant[0]);
});
