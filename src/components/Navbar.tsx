// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";
import clsx from "clsx";

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  const item = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={clsx(
          "text-sm transition-colors",
          active
            ? "text-foreground underline underline-offset-4"
            : "text-gray hover:text-blue"
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
      {item("/", "Board")}
      {item("/backlog", "Backlog")}
    </nav>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 py-4 px-4 md:px-8">
      {/* Full-width wrapper provides x-padding; inner locks at a max width */}
      <div className="mx-auto w-full max-w-[1120px] bg-background/80 backdrop-blur rounded-[var(--radius-xl)] border  border-black/10 shadow-[var(--shadow-elevated)]">
        <div className="px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Brand (logo) */}
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded-lg border  border-black/10"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setOpen((s) => !s)}
              >
                {open ? <X className="h-4 w-4 text-gray" /> : <Menu className="h-4 w-4 text-gray" />}
              </button>

              <Link href="/" aria-label="Home" className="inline-flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Becoming You"
                  width={180}
                  height={36}
                  priority
                  className="h-9 w-auto"
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <NavLinks />
              <a
                className="inline-flex items-center gap-2 rounded-xl border  border-black/10 px-3 py-2 text-sm text-gray hover:bg-black/5"
                href="https://github.com/your/repo" // ← replace when ready
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                Repo
              </a>
            </div>
          </div>

          {/* Mobile drawer (inside rounded container) */}
          {open && (
            <div className="md:hidden pb-4">
              <div className="mt-2 rounded-xl border  border-black/10 bg-background p-4">
                <NavLinks onClick={() => setOpen(false)} />
                <a
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border  border-black/10 px-3 py-2 text-sm text-gray hover:bg-black/5"
                  href="https://github.com/your/repo" // ← replace when ready
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Repo
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
