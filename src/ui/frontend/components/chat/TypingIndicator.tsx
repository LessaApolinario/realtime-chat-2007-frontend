"use client";

import type { Participant } from "@/@types/Participant";

interface TypingIndicatorProps {
  users: Participant[];
}

export function TypingIndicator({ users }: TypingIndicatorProps) {
  function getMessage() {
    if (users.length === 1) {
      return `${users[0].name} está digitando...`;
    }

    if (users.length === 2) {
      return `${users[0].name} e ${users[1].name} estão digitando...`;
    }

    return `${users[0].name}, ${users[1].name} e mais ${users.length - 2} estão digitando...`;
  }

  return (
    <div className="flex items-center gap-2 px-4 py-1 text-sm text-cyan-400">
      <span>{getMessage()}</span>
      <div className="flex items-center gap-1">
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}
