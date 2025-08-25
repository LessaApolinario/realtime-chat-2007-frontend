import { ChatPermission } from "@/@types/enum/chat/ChatPermission";
import type { ChatRoom } from "@/core/domain/models/ChatRoom";

interface ChatCardProps {
  data: ChatRoom;
}

export function ChatRoomCard({ data }: ChatCardProps) {
  const mappedPermissionsTexts: Record<ChatPermission, string> = {
    admin: "Apenas admins",
    guest: "Apenas para usuários comuns",
    all: "Livre para todos",
  };
  const permissionText = mappedPermissionsTexts[data.permission];

  return (
    <div className="bg-zinc-800 text-zinc-600">
      <p>{data.name}</p>
      <p>{data.type}</p>
      <p>{permissionText}</p>
    </div>
  );
}
