import type { CreateUserSignedTokenRequest } from "@/@types/http/request/auth";
import type { CreateUserSignedTokenResponse } from "@/@types/http/response/auth";
import { useState } from "react";

export function useUserToken() {
  const [token, setToken] = useState("");

  async function updateUserToken(payload: CreateUserSignedTokenRequest) {
    const response = await fetch("/api/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return;
    }

    const data: CreateUserSignedTokenResponse = await response.json();
    setToken(data.token ?? "");
  }

  return {
    token,
    updateUserToken,
  };
}
