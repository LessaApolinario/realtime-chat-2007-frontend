"use client";

import type { ChatMessage } from "@/@types/ChatMessage";
import { formatDate } from "@/core/utils";

interface ChatMessageCardProps {
  message: ChatMessage;
}

export function ChatMessageCard({ message }: ChatMessageCardProps) {
  const orientationClass = message.sentByMe ? "self-end" : "";
  const textOrientationClass = message.sentByMe ? "text-right" : "";
  const dateOrientationClass = message.sentByMe ? "justify-end" : "";

  return (
    <div
      className={`${orientationClass} min-w-40 rounded-xl border border-cyan-500 bg-zinc-600 p-2`}
    >
      {!message.sentByMe && (
        <p className={`${textOrientationClass} text-base text-cyan-400`}>
          {message.senderName}
        </p>
      )}

      <p className={`${textOrientationClass} text-base text-cyan-500`}>
        {message.text}
      </p>
      <time
        className={`${dateOrientationClass} flex items-center text-xs text-zinc-300`}
        about="message date"
      >
        <small>{formatDate(message.createdAt)}</small>
      </time>
    </div>
  );
}
