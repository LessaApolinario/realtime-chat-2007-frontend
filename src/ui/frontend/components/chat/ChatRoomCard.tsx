import { ChatPermission } from "@/@types/enum/chat/ChatPermission";
import type { ChatRoomType } from "@/@types/enum/chat/ChatRoomType";
import type { ChatRoom } from "@/core/domain/models/ChatRoom";

interface ChatCardProps {
  chatRoom: ChatRoom;
  onEnterChatRoom: (roomId: string) => void | Promise<void>;
}

export function ChatRoomCard({ chatRoom, onEnterChatRoom }: ChatCardProps) {
  const mappedPermissionsTexts: Record<ChatPermission, string> = {
    admin: "Admins",
    guest: "Usuários comuns",
    all: "Todos",
  };
  const permissionText = mappedPermissionsTexts[chatRoom.permission];

  const mappedChatRoomTypes: Record<ChatRoomType, string> = {
    public: "Pública",
    private: "Privada",
  };
  const chatRoomTypeText = mappedChatRoomTypes[chatRoom.type];

  const isPublicChatRoom = chatRoom.type === "public";
  const isAvailableForEverybody = chatRoom.permission === "all";

  const formattedDate = new Date(chatRoom.created_at).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <div className="overflow-hidden rounded-xl bg-zinc-800">
      <div className="flex h-40 w-full items-center justify-center bg-zinc-700 text-xl font-semibold text-zinc-400">
        Cover
      </div>

      <div className="p-5">
        <h2 className="mb-1 text-xl font-bold text-white">{chatRoom.name}</h2>
        <p className="mb-3 text-sm text-zinc-400">Criada em {formattedDate}</p>

        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm text-zinc-400">Sala:</span>
          <span
            className={`rounded-full px-2 py-1 text-sm font-semibold ${
              isPublicChatRoom
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {chatRoomTypeText}
          </span>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-zinc-400">Permitida para:</span>
          <span
            className={`rounded-full px-2 py-1 text-sm font-semibold ${
              isAvailableForEverybody
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {permissionText}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onEnterChatRoom(chatRoom.id)}
          className="h-12 w-full cursor-pointer rounded-md bg-cyan-600 font-medium text-zinc-800 transition-colors hover:bg-cyan-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
