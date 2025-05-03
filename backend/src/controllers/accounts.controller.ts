import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { findAccountByUsername } from "../services/accounts.service";

/**
 * POST /login: Logins into an employee account.
 *
 * - Role required: None
 * - Accepts body:
 *   - username (string)
 *   - password (string)
 * - Returns:
 *   - 400: If the body is malformed
 *   - 404: If the username is not found
 *   - 403: If the password is incorrect
 *   - 200: With the token
 */
export const loginController = expressAsyncHandler(async (req, res) => {
  const schema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const body = schema.safeParse(req.body);
  if (body.error) {
    res.status(400).json({ message: "Invalid login body" });
    return;
  }

  const accountsResult = await findAccountByUsername(body.data.username);
  if (accountsResult.length == 0) {
    res.status(404).json({ message: "Employee account was not found" });
    return;
  }

  if (!bcrypt.compareSync(body.data.password, accountsResult[0].password)) {
    res.status(403).json({ message: "Incorrect password" });
    return;
  }

  res
    .cookie("authorization", jwt.sign({ id: accountsResult[0].id }, process.env.JWT_SECRET!), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send();
});

/**
 * GET /logout: Logouts the user by clearing the cookie.
 */
export const logoutController = expressAsyncHandler(async (_, res) => {
  res.clearCookie("authorization").send();
});
