"use client";

import { useEffect } from "react";
import Board from "@/components/Board";
import { useBoard } from "lib/store";
import { seedTasks } from "lib/seed";   // <-- use the new seeds

export default function Home() {
  const tasks = useBoard((s) => s.tasks);
  const resetDemo = useBoard((s) => s.resetDemo);

  useEffect(() => {
    // One-time seeding guard so it doesn't re-run every refresh
    const seeded = typeof window !== "undefined" && localStorage.getItem("kanban-seeded-v1");
    if (!seeded && tasks.length === 0) {
      resetDemo(seedTasks);
      localStorage.setItem("kanban-seeded-v1", "1");
    }
  }, [tasks.length, resetDemo]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <section id="kanban">
        <Board />
      </section>
    </main>
  );
}
