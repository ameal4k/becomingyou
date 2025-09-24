import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "./types";

export type BoardState = {
  tasks: Task[];
  addTask: (t: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  moveTask: (id: string, status: Status) => void; // you already had this
  resetDemo: (seed: Task[]) => void;

  // NEW:
  reorderWithin: (status: Status, activeId: string, overId: string) => void;
  moveTo: (activeId: string, toStatus: Status, toIndex: number) => void;
};

export const useBoard = create<BoardState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (t) => set((s) => ({ tasks: [...s.tasks, t] })),
      updateTask: (id, patch) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t
          ),
        })),
      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      moveTask: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, status, updatedAt: Date.now() } : t
          ),
        })),

      resetDemo: (seed) => set({ tasks: seed }),

      // --- NEW ---
      reorderWithin: (status, activeId, overId) =>
        set((s) => {
          const col = s.tasks
            .filter((t) => t.status === status)
            .sort((a, b) => a.position - b.position);

          const from = col.findIndex((t) => t.id === activeId);
          const to = col.findIndex((t) => t.id === overId);
          if (from < 0 || to < 0 || from === to) return {};

          // reorder
          const reordered = [...col];
          const [moved] = reordered.splice(from, 1);
          reordered.splice(to, 0, moved);

          // compact positions
          reordered.forEach((t, idx) => (t.position = idx));

          const ids = new Set(reordered.map((t) => t.id));
          return {
            tasks: s.tasks.map((t) =>
              ids.has(t.id) ? { ...reordered.find((x) => x.id === t.id)! , updatedAt: Date.now() } : t
            ),
          };
        }),

      moveTo: (activeId, toStatus, toIndex) =>
        set((s) => {
          const active = s.tasks.find((t) => t.id === activeId);
          if (!active) return {};

          const fromStatus = active.status;

          // source column (remove)
          const src = s.tasks
            .filter((t) => t.status === fromStatus && t.id !== activeId)
            .sort((a, b) => a.position - b.position);
          src.forEach((t, i) => (t.position = i));

          // target column (insert)
          const dst = s.tasks
            .filter((t) => t.status === toStatus)
            .sort((a, b) => a.position - b.position);

          const insertIndex = Math.max(0, Math.min(toIndex, dst.length));
          const moved: Task = { ...active, status: toStatus };
          dst.splice(insertIndex, 0, moved);
          dst.forEach((t, i) => (t.position = i));

          const touched = new Set([...src, ...dst, moved].map((t) => t.id));
          return {
            tasks: s.tasks.map((t) =>
              touched.has(t.id)
                ? {
                    ...(t.id === activeId ? moved : (src.find(x => x.id===t.id) ?? dst.find(x => x.id===t.id))!),
                    updatedAt: Date.now(),
                  }
                : t
            ),
          };
        }),
    }),
    { name: "board" }
  )
);
