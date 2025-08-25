import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Página de login",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-2 bg-zinc-900 text-zinc-200">
      <div className="flex items-center justify-center">
        <form
          method="post"
          action="/api/auth/login"
          className="flex w-md flex-col gap-4 rounded-xl bg-zinc-800 p-8 shadow-lg"
        >
          <h2 className="mb-4 text-center text-3xl font-semibold text-cyan-400">
            Realizar login
          </h2>

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

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-cyan-600 py-3 font-medium text-zinc-200 transition-colors hover:bg-cyan-500"
          >
            Entrar
          </button>

          <div className="w-full text-center text-zinc-300">
            Ainda não tem conta? Cadastre-se{" "}
            <Link
              className="text-cyan-600 hover:text-cyan-500"
              href={"/auth/register"}
            >
              aqui
            </Link>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center bg-cyan-900/20">
        <h3 className="text-4xl font-bold text-cyan-200">Bem-vindo!</h3>
      </div>
    </main>
  );
}
