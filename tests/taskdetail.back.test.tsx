// tests/taskdetail.back.test.tsx
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Task } from "lib/types";

// --- Mocks for next/navigation
const push = vi.fn();
const back = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "x1" }),
  useRouter: () => ({ push, back }),
  useSearchParams: () => ({
    get: (k: string) => (k === "from" ? "/backlog" : null),
  }),
  usePathname: () => "/backlog",
}));

// --- Mock store to provide a single task (typed)
type MockStore = {
  tasks: Task[];
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
};

vi.mock("lib/store", () => ({
  useBoard:
    (sel: (s: MockStore) => unknown) =>
      sel({
        tasks: [
          {
            id: "x1",
            title: "A task",
            description: "details",
            status: "scheduled",
            position: 0,
            createdAt: 1,
            updatedAt: 1,
          } satisfies Task,
        ],
        updateTask: vi.fn(),
        removeTask: vi.fn(),
      }),
}));

// Import after mocks
import TaskDetailPage from "@/app/task/[id]/page";

describe("Task detail back behavior", () => {
  test("Back button respects ?from=/backlog", () => {
    render(<TaskDetailPage />);

    const backBtn = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backBtn);

    expect(push).toHaveBeenCalledWith("/backlog");
    expect(back).not.toHaveBeenCalled();
  });
});
