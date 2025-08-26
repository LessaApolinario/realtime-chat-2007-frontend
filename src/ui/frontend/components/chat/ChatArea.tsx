"use client";

import type { FetchChartRoomsResponse } from "@/@types/http/response/auth";
import type { ChatRoom } from "@/core/domain/models/ChatRoom";
import { useEffect, useState } from "react";
import { Modal } from "../base/Modal";
import { ChatRoomCard } from "./ChatRoomCard";
import { CreateChatRoomForm } from "./CreateChatRoomModal";

export function ChatArea() {
  const [rooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isCreateChatRoomModalVisible, setIsCreateChatRoomModalVisible] =
    useState(false);

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

      <ul className="lg:gid-cols-4 xl:grid-col-6 grid list-none grid-cols-1 sm:grid-cols-1 md:grid-cols-4 2xl:grid-cols-8">
        {rooms.map((room) => {
          return <ChatRoomCard key={room.id} data={room} />;
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
