import type { ChatMessage } from "@/@types/ChatMessage";
import type { Participant } from "@/@types/Participant";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface ChatRoomHookProps {
  roomId: string;
  token: string;
  url?: string;
}

type FormattedMessage = ChatMessage & { sentByMe: boolean };

export function useChatRoomSocket({ roomId, token, url }: ChatRoomHookProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Participant[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [socketId, setSocketId] = useState<string | undefined>();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const endpoint =
      url ?? process.env.NEXT_PUBLIC_REALTIME_CHAT_WEB_SOCKET_URL;

    if (!endpoint) {
      console.warn("useChatRoomSocket: websocket URL is not defined");
      return;
    }

    const socket = io(endpoint, { auth: { token } });
    socketRef.current = socket;

    function onConnect() {
      setSocketId(socket.id);
      socket.emit("joinChatRoom", { roomId });
      socket.emit("roomParticipants", { roomId });
    }

    function onMessage(message: ChatMessage) {
      setMessages((prev) => [...prev, message]);
    }

    function onTyping({ user }: { user: Participant }) {
      setTypingUsers((prev) => {
        if (prev.find((u) => u.id === user.id)) return prev;
        return [...prev, user];
      });
    }

    function onStopTyping({ user }: { user: Participant }) {
      setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
    }

    function onRoomParticipants(roomParticipants: Participant[]) {
      setParticipants(roomParticipants);
    }

    socket.on("connect", onConnect);
    socket.on("message", onMessage);
    socket.on("typing", onTyping);
    socket.on("stopTyping", onStopTyping);
    socket.on("roomParticipants", onRoomParticipants);

    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onMessage);
      socket.off("typing", onTyping);
      socket.off("stopTyping", onStopTyping);
      socket.off("roomParticipants", onRoomParticipants);

      try {
        if (socket && socket.connected) {
          socket.emit("leaveChatRoom", { roomId });
        }
      } catch (error) {
        console.error("Error leaving chat room: ", error);
      }

      socket.disconnect();
      socketRef.current = null;
      setSocketId(undefined);
    };
  }, [roomId, token, url]);

  const formattedMessages = useMemo<FormattedMessage[]>(() => {
    return messages.map((message) => {
      return {
        ...message,
        sentByMe: message.senderId === socketId,
      };
    });
  }, [messages, socketId]);

  const handleSendMessage = useCallback(
    (text: string) => {
      socketRef.current?.emit("message", { roomId, text });
    },
    [roomId],
  );

  const handleStartTyping = useCallback(() => {
    socketRef.current?.emit("typing", { roomId });
  }, [roomId]);

  const handleStopTyping = useCallback(() => {
    socketRef.current?.emit("stopTyping", { roomId });
  }, [roomId]);

  const handleLeaveChatRoom = useCallback(() => {
    socketRef.current?.emit("leaveChatRoom", { roomId });
  }, [roomId]);

  return {
    formattedMessages,
    handleSendMessage,
    handleStartTyping,
    handleStopTyping,
    handleLeaveChatRoom,
    participants,
    typingUsers,
  } as const;
}
