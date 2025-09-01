import type { CreateUserSignedTokenRequest } from "@/@types/http/request/auth";
import type { CreateUserSignedTokenResponse } from "@/@types/http/response/auth";
import { useEffect, useState } from "react";

interface UserTokenHookProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function useUserToken({ user }: UserTokenHookProps) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      updateUserToken({
        name: user.name ?? "",
        email: user.email ?? "",
      });
    }
  }, [user]);

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
  };
}
