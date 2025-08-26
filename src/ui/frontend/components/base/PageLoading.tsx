"use client";

import type { PropsWithChildren } from "react";

export function PageLoading({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-900">
      {children}
    </div>
  );
}
