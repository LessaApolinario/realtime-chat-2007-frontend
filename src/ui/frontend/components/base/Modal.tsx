"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl bg-zinc-800 p-8 text-zinc-200 shadow-lg">
        <header className="flex w-full items-center justify-end">
          <button
            className="rounded-full bg-cyan-600 px-3 py-1 text-zinc-200 transition-colors hover:bg-cyan-500"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
