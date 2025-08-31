"use client";

import type { ChatMessage } from "@/@types/ChatMessage";
import type { Participant } from "@/@types/Participant";
import { ChatMessages } from "@/ui/frontend/components/chat/ChatMessages";
import { ParticipantsSidebar } from "@/ui/frontend/components/chat/ParticipantsSidebar";
import { useSocket } from "@/ui/frontend/hooks/useSocket";
import { useUserToken } from "@/ui/frontend/hooks/useUserToken";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ChatRoomPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const roomId = params.id;

  const { token, updateUserToken } = useUserToken();
  const { createWebSocketConnection, emitEvent, onEvent, socket } = useSocket(
    process.env.NEXT_PUBLIC_REALTIME_CHAT_WEB_SOCKET_URL,
  );

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

    emitEvent("roomParticipants", { roomId });

    onEvent("roomParticipants", (roomParticipants: Participant[]) => {
      setParticipants(roomParticipants);
    });

    onEvent("message", (message: ChatMessage) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    });

    return () => {
      emitEvent("leaveChatRoom", { roomId });
    };
  }, [socket]);

  const formattedMessages = useMemo<ChatMessage[]>(() => {
    return messages.map((currentMessage) => {
      return {
        ...currentMessage,
        sentByMe: socket?.id === currentMessage.senderId,
      };
    });
  }, [messages]);

  function handleSendMessage(text: string) {
    emitEvent("message", { roomId, text });
  }

  return (
    <main className="h-[calc(100vh_-_5rem)] bg-zinc-900 p-16 text-cyan-400">
      <h1 className="text-xl">
        <strong>Chat da sala:</strong>{" "}
        <span className="font-normal text-zinc-300">{roomId}</span>
      </h1>

      <section className="grid h-[calc(100%_-_3.75rem)] w-full grid-cols-[2fr_1fr] gap-8">
        <ChatMessages
          messages={formattedMessages}
          onSendMessage={handleSendMessage}
        />
        <ParticipantsSidebar participants={participants} />
      </section>
    </main>
  );
}
