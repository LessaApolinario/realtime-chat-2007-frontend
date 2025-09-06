import type { CreateChatRoomRequest } from "@/@types/http/request/auth";
import type {
  CreateChatRoomResponse,
  FetchChartRoomsResponse,
} from "@/@types/http/response/auth";
import type { ChatRoom } from "@/core/domain/models/ChatRoom";
import { useState } from "react";

export function useChatRoomAPI() {
  const [rooms, setChatRooms] = useState<ChatRoom[]>([]);

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

  async function createChatRoom(payload: CreateChatRoomRequest) {
    const response = await fetch("/api/chat/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: CreateChatRoomResponse = await response.json();
    return data;
  }

  return {
    rooms,
    fetchChatRooms,
    createChatRoom,
  };
}
