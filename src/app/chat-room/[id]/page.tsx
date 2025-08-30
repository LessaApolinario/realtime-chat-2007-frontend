"use client";

import { useSocket } from "@/ui/frontend/hooks/useSocket";
import { useUserToken } from "@/ui/frontend/hooks/useUserToken";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatRoomPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const roomId = params.id;

  const { token, updateUserToken } = useUserToken();
  const { createWebSocketConnection, emitEvent, socket } = useSocket(
    process.env.REALTIME_CHAT_WEB_SOCKET_URL,
  );

  useEffect(() => {
    if (session?.user) {
      updateUserToken({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      });
    }
  }, [session]);

  useEffect(() => {
    if (token) {
      createWebSocketConnection(token);
    }

    return () => {
      socket?.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    emitEvent("joinChatRoom", { roomId });

    // onEvent("room:joined", (data) => {
    //   console.log("Entrou na sala:", data);
    // });

    return () => {
      // emitEvent("leaveChatRoom", { roomId });
    };
  }, [socket]);

  return (
    <main className="min-h-screen bg-zinc-900 p-16 text-cyan-400">
      <h1 className="text-xl">
        <strong>Chat da sala:</strong>{" "}
        <span className="font-normal text-zinc-300">{roomId}</span>
      </h1>
    </main>
  );
}
