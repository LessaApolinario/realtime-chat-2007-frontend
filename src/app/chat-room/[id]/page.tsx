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
  const { createWebSocketConnection, emitEvent, onEvent, socket } = useSocket(
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
    if (!token) return;

    createWebSocketConnection(token);

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
      emitEvent("leaveChatRoom", { roomId });
    };
  }, [socket]);

  return <div>Chat da sala {roomId}</div>;
}
