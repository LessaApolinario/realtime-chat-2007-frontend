import type { ChatRoom } from "@/core/domain/models/ChatRoom";

export interface FetchChartRoomsResponse {
  chatRooms: ChatRoom[];
}

export interface CreateChatRoomResponse {
  chatRoom: ChatRoom;
  error: Error;
}

export interface CreateUserSignedTokenResponse {
  token: string;
}
