import { describe, expect, test } from "vitest";
import { create } from "zustand";
import type { Task } from "../lib/types";
import { type BoardState } from "../lib/store"; // export the type from store.ts for tests

function makeStore() {
  // make a fresh in-memory store instance (no localStorage)
  return create<BoardState>()((set) => ({
    tasks: [],
    addTask: (t) => set(s => ({ tasks: [...s.tasks, { ...t, createdAt: 1, updatedAt: 1 }] })),
    updateTask: (id, patch) => set(s => ({
      tasks: s.tasks.map(t => t.id === id ? { ...t, ...patch, updatedAt: 2 } : t)
    })),
    removeTask: (id) => set(s => ({ tasks: s.tasks.filter(t => t.id !== id) })),
    moveTask: (id, status) => set(s => ({
      tasks: s.tasks.map(t => t.id === id ? { ...t, status, updatedAt: 3 } : t)
    })),
    resetDemo: (seed) => set({ tasks: seed }),
  }));
}

describe("board store", () => {
  test("add / update / move / remove", () => {
    const useTest = makeStore();
    const add = useTest.getState().addTask;
    const update = useTest.getState().updateTask;
    const move = useTest.getState().moveTask;
    const remove = useTest.getState().removeTask;

    add({ id: "t1", title: "A", status: "scheduled" } as Task);
    expect(useTest.getState().tasks).toHaveLength(1);

    update("t1", { title: "A+" });
    expect(useTest.getState().tasks[0].title).toBe("A+");

    move("t1", "in-progress");
    expect(useTest.getState().tasks[0].status).toBe("in-progress");

    remove("t1");
    expect(useTest.getState().tasks).toHaveLength(0);
  });
});
