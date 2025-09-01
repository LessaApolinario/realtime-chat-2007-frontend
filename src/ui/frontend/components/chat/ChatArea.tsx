"use client";

import type { FetchChartRoomsResponse } from "@/@types/http/response/auth";
import type { ChatRoom } from "@/core/domain/models/ChatRoom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useUserToken } from "../../hooks/useUserToken";
import { Modal } from "../base/Modal";
import { ChatRoomCard } from "./ChatRoomCard";
import { CreateChatRoomForm } from "./CreateChatRoomForm";

export function ChatArea() {
  const { data: session } = useSession();
  const { socket: chatRoomWebSocket, createWebSocketConnection } = useSocket(
    process.env.NEXT_PUBLIC_REALTIME_CHAT_WEB_SOCKET_URL,
  );
  const { token } = useUserToken({ user: session?.user });
  const router = useRouter();
  const [rooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isCreateChatRoomModalVisible, setIsCreateChatRoomModalVisible] =
    useState(false);

  useEffect(() => {
    if (token) {
      createWebSocketConnection(token);
    }

    return () => {
      chatRoomWebSocket?.disconnect();
    };
  }, [token]);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const response = await fetch("/api/chat/list");
        if (response.ok) {
          const data: FetchChartRoomsResponse = await response.json();
          setChatRooms(data.chatRooms);
        }
      } catch (error) {
        console.error("Error fetching chat rooms: ", error);
      }
    }

    fetchChatRooms();
  }, []);

  function handleOpenCreateChatRoomModal() {
    setIsCreateChatRoomModalVisible(true);
  }

  function handleCloseCreateChatRoomModal() {
    setIsCreateChatRoomModalVisible(false);
  }

  function handleEnterChatRoom(roomId: string) {
    router.push(`/chat-room/${roomId}`);
  }

  return (
    <section className="w-full">
      <div className="mb-5">
        <button
          type="button"
          onClick={handleOpenCreateChatRoomModal}
          className="cursor-pointer rounded-full bg-cyan-600 px-3 py-1 text-lg text-zinc-950 hover:bg-cyan-500"
        >
          +
        </button>
      </div>

      <ul className="grid w-full grid-cols-1 items-stretch gap-6 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {rooms.map((room) => {
          return (
            <li key={room.id} className="w-full">
              <ChatRoomCard
                chatRoom={room}
                onEnterChatRoom={handleEnterChatRoom}
              />
            </li>
          );
        })}
      </ul>

      {isCreateChatRoomModalVisible && (
        <Modal
          isOpen={isCreateChatRoomModalVisible}
          onClose={handleCloseCreateChatRoomModal}
        >
          <CreateChatRoomForm onClose={handleCloseCreateChatRoomModal} />
        </Modal>
      )}
    </section>
  );
}
