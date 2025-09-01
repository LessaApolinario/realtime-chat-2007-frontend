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
    const isEnterKey = event.key === "Enter";
    if (isEnterKey) {
      handleSendMessage();
    }
  }

  return (
    <section className="flex h-full flex-col rounded-xl bg-zinc-800">
      {messages.length ? (
        <div className="h-[calc(100%_-_4.5rem)] w-full overflow-y-scroll rounded-xl bg-zinc-700 p-4 text-white">
          <div className="flex flex-col space-y-3">
            {messages.map((message) => (
              <ChatMessageCard message={message} key={message.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100%_-_4.5rem)] items-center justify-center rounded-xl bg-zinc-700 text-lg text-cyan-500">
          Sem mensagens nesta sala
        </div>
      )}

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
