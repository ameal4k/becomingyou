// tests/taskcard.test.tsx
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Task } from "lib/types";

// Pretend we are on "/"
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Minimal typed slice of the board store used by TaskCard
type MockStore = {
  removeTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
};

// TaskCard pulls actions from the store; we mock just what's needed
vi.mock("lib/store", () => ({
  useBoard:
    (sel: (s: MockStore) => unknown) =>
      sel({
        removeTask: vi.fn(),
        updateTask: vi.fn(),
      }),
}));

import TaskCard from "@/components/TaskCard";

describe("TaskCard", () => {
  test("detail link includes ?from=/", () => {
    const task: Task = {
      id: "t1",
      title: "Hello",
      status: "scheduled",
      position: 0,
      createdAt: 1,
      updatedAt: 1,
    };

    render(<TaskCard task={task} />);

    const link = screen.getByRole("link", { name: /hello/i }) as HTMLAnchorElement;

    // Next/link href in tests is the attribute value
    expect(link.getAttribute("href")).toMatch(/^\/task\/t1\?from=%2F$/);
  });
});
