import type { ChatMessage } from "@/@types/ChatMessage";
import type { Participant } from "@/@types/Participant";
import { useEffect, useMemo, useState } from "react";
import { useSocket } from "./useSocket";

interface ChatRoomHookProps {
  roomId: string;
  token: string;
}

export function useChatRoom({ roomId, token }: ChatRoomHookProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const { createWebSocketConnection, emitEvent, onEvent, socket } = useSocket(
    process.env.NEXT_PUBLIC_REALTIME_CHAT_WEB_SOCKET_URL,
  );

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

  function handleStartTyping(isTyping: boolean) {
    emitEvent("typing", { roomId, isTyping });
  }

  return {
    formattedMessages,
    handleSendMessage,
    handleStartTyping,
    participants,
  };
}
