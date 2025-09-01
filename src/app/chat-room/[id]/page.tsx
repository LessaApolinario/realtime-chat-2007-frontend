"use client";

import { ChatMessages } from "@/ui/frontend/components/chat/ChatMessages";
import { ParticipantsSidebar } from "@/ui/frontend/components/chat/ParticipantsSidebar";
import { useChatRoom } from "@/ui/frontend/hooks/useChatRoom";
import { useDocumentTitle } from "@/ui/frontend/hooks/useDocumentTitle";
import { useUserToken } from "@/ui/frontend/hooks/useUserToken";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ChatRoomPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const { token } = useUserToken({ user: session?.user });
  const {
    formattedMessages,
    handleSendMessage,
    handleStartTyping,
    participants,
  } = useChatRoom({
    roomId: params.id,
    token,
  });
  useDocumentTitle(`Sala de chat - ${params.id}`);

  return (
    <main className="h-[calc(100vh_-_5rem)] bg-zinc-900 p-16 text-cyan-400">
      <h1 className="text-xl">
        <strong>Chat da sala:</strong>{" "}
        <span className="font-normal text-zinc-300">{params.id}</span>
      </h1>

      <section className="grid h-[calc(100%_-_1.75rem)] min-h-0 w-full grid-cols-[2fr_1fr] gap-8">
        <ChatMessages
          messages={formattedMessages}
          onSendMessage={handleSendMessage}
          onStartTyping={handleStartTyping}
        />
        <ParticipantsSidebar participants={participants} />
      </section>
    </main>
  );
}
