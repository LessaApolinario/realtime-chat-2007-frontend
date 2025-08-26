import type { ChatPermission } from "@/@types/enum/chat/ChatPermission";
import type { ChatRoomType } from "@/@types/enum/chat/ChatRoomType";

export interface CreateChatRoomRequest {
  name: string;
  type?: ChatRoomType;
  permission?: ChatPermission;
  password?: string;
}
