"use client";

import { PageLoading } from "@/ui/frontend/components/base/PageLoading";
import { Spinner } from "@/ui/frontend/components/base/Spinner";
import { ChatMessages } from "@/ui/frontend/components/chat/ChatMessages";
import { ParticipantsSidebar } from "@/ui/frontend/components/chat/ParticipantsSidebar";
import { useChatRoom } from "@/ui/frontend/hooks/useChatRoom";
import { useChatRoomAPI } from "@/ui/frontend/hooks/useChatRoomAPI";
import { useDocumentTitle } from "@/ui/frontend/hooks/useDocumentTitle";
import { useUserToken } from "@/ui/frontend/hooks/useUserToken";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatRoomPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });
  const { token } = useUserToken({ user: session?.user });
  const {
    formattedMessages,
    handleSendMessage,
    handleStartTyping,
    handleStopTyping,
    participants,
    typingUsers,
  } = useChatRoom({
    roomId: params.id,
    token,
  });
  const { chatRoom, fetchChatRoomByID } = useChatRoomAPI();
  useDocumentTitle(`Bem-vindo a ${chatRoom?.name ?? ""}`);

  useEffect(() => {
    fetchChatRoomByID(params.id);
  }, []);

  if (status === "loading") {
    return (
      <PageLoading>
        <Spinner className="h-20 w-20 border-6 border-cyan-600" />
      </PageLoading>
    );
  }

  if (status !== "authenticated") {
    return <p>Você não está logado</p>;
  }

  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col bg-zinc-900 p-4 text-cyan-400">
      <h1 className="mb-4 text-xl">
        <span className="font-normal text-zinc-300">{chatRoom?.name}</span>
      </h1>

      <section className="grid min-h-0 w-full flex-1 grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ChatMessages
          typingUsers={typingUsers}
          messages={formattedMessages}
          onStopTyping={handleStopTyping}
          onStartTyping={handleStartTyping}
          onSendMessage={handleSendMessage}
        />
        <ParticipantsSidebar participants={participants} />
      </section>
    </main>
  );
}
