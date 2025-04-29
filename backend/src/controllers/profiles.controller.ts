import expressAsyncHandler from "express-async-handler";
import { findAccountById } from "../services/accounts.service";

/**
 * GET /profiles: Retreieves the current user's profile.
 *
 * - Required authorization.
 * - Returns:
 *   - 200: The user's data
 */
export const getProfileController = expressAsyncHandler(async (req, res) => {
  res.status(200).json((await findAccountById(req["account"].id))[0]);
});
