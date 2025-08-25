"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status !== "authenticated") {
    return <p>Você não está logado</p>;
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-cyan-400">
      <p>Bem-vindo {session?.user?.name}</p>

      <button
        type="button"
        onClick={() => signOut()}
        className="w-40 cursor-pointer rounded-md bg-cyan-600 py-3 font-medium text-zinc-200 transition-colors hover:bg-cyan-500"
      >
        Sair
      </button>
    </main>
  );
}
