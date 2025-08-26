"use client";

import { PageLoading } from "@/ui/frontend/components/base/PageLoading";
import { Spinner } from "@/ui/frontend/components/base/Spinner";
import { ChatArea } from "@/ui/frontend/components/chat/ChatArea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

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
    <main className="min-h-screen bg-zinc-900 p-16 text-cyan-400">
      <ChatArea />
    </main>
  );
}
