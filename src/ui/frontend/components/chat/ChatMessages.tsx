"use client";

import type { ChatMessage } from "@/@types/ChatMessage";
import { SendHorizonal } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { ChatMessageCard } from "./ChatMessageCard";

interface ChatMessageProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void | Promise<void>;
}

export function ChatMessages({ messages, onSendMessage }: ChatMessageProps) {
  const textRef = useRef<HTMLInputElement>(null);

  function handleSendMessage() {
    if (textRef.current && textRef.current.value.length) {
      onSendMessage(textRef.current.value);
      textRef.current.value = "";
    }
  }

  function handleSendMessageOnPressEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <section className="flex min-h-0 flex-col rounded-xl bg-zinc-800">
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto rounded-xl bg-zinc-700 p-4 text-white">
        {messages.length ? (
          messages.map((message) => (
            <ChatMessageCard message={message} key={message.id} />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center text-lg text-cyan-500">
            Sem mensagens nesta sala
          </div>
        )}
      </div>

      <div className="flex h-[4.5rem] w-full items-center justify-center gap-2 p-2">
        <input
          ref={textRef}
          type="text"
          placeholder="Mensagem"
          onKeyDown={handleSendMessageOnPressEnter}
          className="flex-1 rounded-md border border-cyan-500 bg-zinc-800 p-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
        />

        <button
          onClick={handleSendMessage}
          type="button"
          className="cursor-pointer rounded-md p-2 text-cyan-400 hover:text-cyan-300"
        >
          <SendHorizonal />
        </button>
      </div>
    </section>
  );
}
