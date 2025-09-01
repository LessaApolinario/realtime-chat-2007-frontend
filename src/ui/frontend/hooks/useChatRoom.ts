import { useSession } from "next-auth/react";
import { useUserToken } from "./useUserToken";
import { useSocket } from "./useSocket";
import { useEffect, useMemo, useState } from "react";
import type { ChatMessage } from "@/@types/ChatMessage";
import type { Participant } from "@/@types/Participant";

interface ChatRoomHookProps {
  roomId: string;
}

export function useChatRoom({ roomId }: ChatRoomHookProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const { token, updateUserToken } = useUserToken();
  const { createWebSocketConnection, emitEvent, onEvent, socket } = useSocket(
    process.env.NEXT_PUBLIC_REALTIME_CHAT_WEB_SOCKET_URL,
  );

  const { data: session } = useSession();

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

  return {
    formattedMessages,
    handleSendMessage,
    participants,
  };
}
