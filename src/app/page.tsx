import Image from "next/image";
import Link from "next/link";
import homeBackground from "../assets/home-abstract-bg.png";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Image
        className="absolute top-0 right-0 bottom-0 left-0 h-screen w-screen"
        src={homeBackground}
        width={4000}
        alt="Home background"
      />

      <div className="absolute top-1/2 bottom-1/2 left-8">
        <h1 className="mb-1.5 text-4xl text-zinc-200">Real-time chat 2007</h1>
        <p className="mb-2.5 text-2xl text-zinc-200">
          Chat with people around the world and make new friends
        </p>

        <Link
          href="/auth/login"
          className="inline-block cursor-pointer rounded-md bg-cyan-700 p-4 text-center text-zinc-200"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}
