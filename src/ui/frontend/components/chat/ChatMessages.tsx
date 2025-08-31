"use client";

import type { ChatMessage } from "@/@types/ChatMessage";
import { SendHorizonal } from "lucide-react";
import { useRef } from "react";
import { ChatMessageCard } from "./ChatMessageCard";

interface ChatMessageProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void | Promise<void>;
}

export function ChatMessages({ messages, onSendMessage }: ChatMessageProps) {
  const textRef = useRef<HTMLInputElement>(null);

  function handleSendMessage() {
    if (textRef.current) {
      onSendMessage(textRef.current.value);
      textRef.current.value = "";
    }
  }

  return (
    <section className="rounded-xl bg-zinc-800">
      <div className="flex h-[calc(100%_-_7.1rem)] w-full flex-col gap-3 overflow-y-scroll rounded-xl bg-zinc-700 p-4 text-white">
        {messages.map((message) => {
          return <ChatMessageCard message={message} key={message.id} />;
        })}
      </div>

      <div className="flex w-full items-center justify-center">
        <input
          ref={textRef}
          type="text"
          placeholder="Mensagem"
          className="w-full rounded-md border border-cyan-500 bg-zinc-800 p-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
        />

        <button
          onClick={handleSendMessage}
          type="button"
          className="w-fit cursor-pointer"
        >
          <SendHorizonal />
        </button>
      </div>
    </section>
  );
}
