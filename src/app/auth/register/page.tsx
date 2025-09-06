"use client";

import { InlineBannerMessage } from "@/ui/frontend/components/base/InlineBannerMessage";
import { PageLoading } from "@/ui/frontend/components/base/PageLoading";
import { Spinner } from "@/ui/frontend/components/base/Spinner";
import { useDocumentTitle } from "@/ui/frontend/hooks/useDocumentTitle";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  useDocumentTitle("Registrar-se");
  const { status } = useSession();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <PageLoading>
        <Spinner className="h-20 w-20 border-6 border-cyan-600" />
      </PageLoading>
    );
  }

  if (status === "authenticated") {
    return (
      <PageLoading>
        <Spinner className="h-20 w-20 border-6 border-cyan-600" />
      </PageLoading>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Erro no registro");
      return;
    }

    router.push("/auth/login");
  }

  return (
    <main className="grid min-h-screen grid-cols-1 bg-zinc-900 text-zinc-200 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex w-md flex-col gap-4 rounded-xl bg-zinc-800 p-8 shadow-lg"
        >
          <h2 className="mb-4 text-center text-3xl font-semibold text-cyan-400">
            Criar conta
          </h2>

          {error && <InlineBannerMessage type="error" text={error} />}

          <div className="flex flex-col gap-2">
            <label htmlFor="usernameField" className="text-sm text-zinc-300">
              Nome de usuário
            </label>
            <input
              id="usernameField"
              name="username"
              type="text"
              placeholder="Seu nome de usuário"
              className="rounded-md border border-cyan-500 bg-zinc-900 p-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="emailField" className="text-sm text-zinc-300">
              Email
            </label>
            <input
              id="emailField"
              name="email"
              type="email"
              placeholder="seu@email.com"
              className="rounded-md border border-cyan-500 bg-zinc-900 p-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="passwordField" className="text-sm text-zinc-300">
              Senha
            </label>
            <input
              id="passwordField"
              name="password"
              type="password"
              placeholder="••••••••"
              className="rounded-md border border-cyan-500 bg-zinc-900 p-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPasswordField"
              className="text-sm text-zinc-300"
            >
              Confirmação de senha
            </label>
            <input
              id="confirmPasswordField"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="rounded-md border border-cyan-500 bg-zinc-900 p-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-cyan-600 py-3 font-medium text-zinc-200 transition-colors hover:bg-cyan-500"
          >
            Registrar
          </button>

          <div className="w-full text-center text-zinc-300">
            Já tem conta? Entre{" "}
            <Link
              className="text-cyan-600 hover:text-cyan-500"
              href={"/auth/login"}
            >
              aqui
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden items-center justify-center bg-cyan-900/20 sm:hidden md:flex lg:flex xl:flex 2xl:flex">
        <h3 className="text-4xl font-bold text-cyan-200">Bem-vindo!</h3>
      </div>
    </main>
  );
}
