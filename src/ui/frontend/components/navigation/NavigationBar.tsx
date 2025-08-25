"use client";

import { signOut, useSession } from "next-auth/react";

export function NavigationBar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <></>;
  }

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <header className="flex w-full items-center justify-between bg-zinc-800 p-4">
      <h2 className="text-cyan-600">Olá, {session?.user?.name}</h2>

      <nav>Links</nav>

      <button
        type="button"
        onClick={() => signOut()}
        className="w-40 cursor-pointer rounded-md bg-cyan-600 py-3 font-medium text-zinc-200 transition-colors hover:bg-cyan-500"
      >
        Sair
      </button>
    </header>
  );
}
