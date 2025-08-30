import type { CreateUserSignedTokenRequest } from "@/@types/http/request/auth";
import jwt, { SignOptions } from "jsonwebtoken";

export function createUserSignedToken(
  data: CreateUserSignedTokenRequest,
  expiresIn: SignOptions["expiresIn"] = "1h",
) {
  return jwt.sign(data, process.env.NEXTAUTH_SECRET!, { expiresIn });
}
