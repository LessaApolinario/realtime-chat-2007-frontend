"use client";

import type { Participant } from "@/@types/Participant";

interface ParticipantsSidebarProps {
  participants: Participant[];
}

export function ParticipantsSidebar({
  participants,
}: ParticipantsSidebarProps) {
  return (
    <aside className="rounded-xl bg-zinc-800 p-8">
      <h2 className="mb-8 text-xl font-bold text-cyan-500">
        Participantes da sala ☀️
      </h2>

      <div className="flex flex-col items-start justify-center gap-3.5">
        {participants.map((participant) => {
          return (
            <p
              className="text-base text-cyan-400 hover:text-cyan-300"
              key={participant.email}
            >
              {participant.name}
            </p>
          );
        })}
      </div>
    </aside>
  );
}
