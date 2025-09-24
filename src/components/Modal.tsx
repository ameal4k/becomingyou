"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-[var(--radius-xl)] border  border-black/10 bg-background shadow-[var(--shadow-elevated)]">
        <header className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <h3 className="font-editorial text-foreground text-lg">{title ?? "Modal"}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg border cursor-pointer border-black/10 p-2 hover:bg-black/5"
          >
            <X className="h-4 w-4 text-gray" />
          </button>
        </header>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
