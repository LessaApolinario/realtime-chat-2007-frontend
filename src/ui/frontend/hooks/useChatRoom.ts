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
  const [typingUsers, setTypingUsers] = useState<Participant[]>([]);

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

    onEvent("typing", ({ user }: { user: Participant }) => {
      setTypingUsers((prev) => {
        if (!prev.find((u) => u.id === user.id)) {
          return [...prev, user];
        }
        return prev;
      });
    });

    onEvent("stopTyping", ({ user }: { user: Participant }) => {
      setTypingUsers((prev) => prev.filter((u) => u.id !== user?.id));
    });

    return () => {
      emitEvent("leaveChatRoom", { roomId });
      socket.disconnect();
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

  function handleStartTyping() {
    emitEvent("typing", { roomId });
  }

  function handleStopTyping() {
    emitEvent("stopTyping", { roomId });
  }

  return {
    formattedMessages,
    handleSendMessage,
    handleStartTyping,
    handleStopTyping,
    participants,
    typingUsers,
  };
}
