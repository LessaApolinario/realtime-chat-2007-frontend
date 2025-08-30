import type { CreateUserSignedTokenRequest } from "@/@types/http/request/auth";
import { createUserSignedToken } from "@/core/utils/session";

export async function POST(request: Request) {
  const requestBody: CreateUserSignedTokenRequest = await request.json();
  const token = createUserSignedToken(requestBody);

  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" },
  });
}
