"use client";

import type { FetchChartRoomsResponse } from "@/@types/http/response/auth";
import type { ChatRoom } from "@/core/domain/models/ChatRoom";
import { useEffect, useState } from "react";
import { ChatRoomCard } from "./ChatRoomCard";

export function ChatArea() {
  const [rooms, setChatRooms] = useState<ChatRoom[]>([]);

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

  function handleOpenCreateChatRoomModal() {}

  return (
    <section>
      <div className="mb-5">
        <button
          type="button"
          onClick={handleOpenCreateChatRoomModal}
          className="cursor-pointer rounded-full bg-zinc-800 p-2 text-zinc-200"
        >
          +
        </button>
      </div>

      <ul className="lg:gid-cols-4 xl:grid-col-6 grid list-none grid-cols-1 sm:grid-cols-1 md:grid-cols-4 2xl:grid-cols-8">
        {rooms.map((room) => {
          return <ChatRoomCard key={room.id} data={room} />;
        })}
      </ul>
    </section>
  );
}
