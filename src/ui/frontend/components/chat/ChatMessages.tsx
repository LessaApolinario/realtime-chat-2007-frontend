"use client";

import type { ChatMessage } from "@/@types/ChatMessage";
import { SendHorizonal } from "lucide-react";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { ChatMessageCard } from "./ChatMessageCard";
import { TypingIndicator } from "./TypingIndicator";

interface ChatMessageProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void | Promise<void>;
  onStartTyping: (isTyping: boolean) => void | Promise<void>;
}

export function ChatMessages({
  messages,
  onSendMessage,
  onStartTyping,
}: ChatMessageProps) {
  const textRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  function handleSendMessage() {
    if (textRef.current && textRef.current.value.length) {
      onSendMessage(textRef.current.value);
      textRef.current.value = "";
      setIsTyping(false);
      onStartTyping(false);
    }
  }

  function handleSendMessageOnPressEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  function handleStartTyping(event: ChangeEvent<HTMLInputElement>) {
    const typing = event.target.value.length > 0;
    setIsTyping(typing);
    onStartTyping(typing);
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

      {isTyping && <TypingIndicator />}

      <div className="flex h-[4.5rem] w-full items-center justify-center gap-2 p-2">
        <input
          ref={textRef}
          type="text"
          placeholder="Mensagem"
          onChange={handleStartTyping}
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
