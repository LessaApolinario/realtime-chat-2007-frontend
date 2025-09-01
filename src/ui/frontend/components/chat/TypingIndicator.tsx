"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 py-1">
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
