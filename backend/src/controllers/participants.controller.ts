import expressAsyncHandler from "express-async-handler";
import { saveParticipant } from "../services/participants.service";

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
