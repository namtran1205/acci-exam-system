import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { findAccountById } from "./services/accounts.service";

/**
 * Attempts to parse the cookies from the params dictionary.
 *
 * @param cookies the cookies map to parse
 * @returns the account, if available
 */
async function parseCookie(cookies: any) {
  if (!cookies["authorization"]) return null;

  const token = cookies["authorization"];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (payload == null) return null;

    const accountsResult = await findAccountById(payload["id"]);
    if (accountsResult.length == 0) return null;

    return accountsResult[0];
  } catch (_) {
    return null;
  }
}

/**
 * Generates a middleware that parses cookies and checks against the role, if provided.
 *
 * @param role the role to check against
 * @returns the middleware
 */
export function authenticate(role: string | undefined = undefined) {
  return expressAsyncHandler(async (req, res, next) => {
    const account = await parseCookie(req.cookies);

    if (!account) {
      res.status(401).json({ message: "This endpoint is protected." });
      return;
    }
    if (role && account.role != role) {
      res.status(403).json({ message: "You're not authorized to view this resource." });
      return;
    }

    req["account"] = account;
    next();
  });
}
