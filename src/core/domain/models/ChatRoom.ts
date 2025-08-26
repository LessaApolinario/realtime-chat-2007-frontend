import type { ChatPermission } from "@/@types/enum/chat/ChatPermission";
import type { ChatRoomType } from "@/@types/enum/chat/ChatRoomType";

export interface ChatRoom {
  id: string;
  name: string;
  type: ChatRoomType;
  permission: ChatPermission;
  user_id: string;
  created_at: string;
  updated_at: string;
}
