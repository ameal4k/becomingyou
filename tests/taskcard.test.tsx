import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Pretend we are on "/"
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// TaskCard pulls actions from the store; we mock just what's needed
vi.mock("lib/store", () => ({
  useBoard: (sel: any) =>
    sel({
      removeTask: vi.fn(),
      updateTask: vi.fn(),
    }),
}));

import TaskCard from "@/components/TaskCard";

describe("TaskCard", () => {
  test("detail link includes ?from=/", () => {
    render(
      <TaskCard
        task={{
          id: "t1",
          title: "Hello",
          status: "scheduled",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        } as any}
      />
    );

    const link = screen.getByRole("link", { name: /hello/i }) as HTMLAnchorElement;

    // Next/link href in tests is the attribute value
    expect(link.getAttribute("href")).toMatch(/^\/task\/t1\?from=%2F$/);
  });
});
