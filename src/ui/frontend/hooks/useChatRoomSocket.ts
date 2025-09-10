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

type UserTypingPayload = { user: Participant };

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

    socketRef.current?.on("connect", () => {
      setSocketId(socketRef.current?.id);
      socketRef.current?.emit("joinChatRoom", { roomId });
      socketRef.current?.emit("roomParticipants", { roomId });
    });

    socketRef.current?.on("disconnect", () => {
      setSocketId(undefined);
    });

    socketRef.current?.on("message", (message: ChatMessage) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    });

    socketRef.current?.on("typing", ({ user }: UserTypingPayload) => {
      setTypingUsers((previousUsers) => {
        const wasUserFound = previousUsers.find((previousUser) => {
          return previousUser.id === user.id;
        });
        if (wasUserFound) {
          return previousUsers;
        }

        return [...previousUsers, user];
      });
    });

    socketRef.current?.on("stopTyping", ({ user }: UserTypingPayload) => {
      setTypingUsers((previousUsers) =>
        previousUsers.filter((previousUser) => {
          return previousUser.id !== user.id;
        }),
      );
    });

    socketRef.current?.on(
      "roomParticipants",
      (roomParticipants: Participant[]) => {
        setParticipants(roomParticipants);
      },
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveChatRoom", { roomId });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
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
    if (socketRef.current) {
      socketRef.current.emit("leaveChatRoom", { roomId });
      socketRef.current.disconnect();
      socketRef.current = null;
    }
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
