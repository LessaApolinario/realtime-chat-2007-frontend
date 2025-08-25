"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Você não está logado</p>;
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-cyan-400">
      <p>Bem-vindo {session?.user?.name}!</p>
    </main>
  );
}
