import type { ChatPermission } from "@/@types/enum/chat/ChatPermission";
import type { ChatRoomType } from "@/@types/enum/chat/ChatRoomType";

export interface ChatRoom {
  id: string;
  name: string;
  type: ChatRoomType;
  permission: ChatPermission;
}
