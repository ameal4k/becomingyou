// tests/backlog.test.tsx
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// mock next/navigation for this test
vi.mock("next/navigation", () => ({
  usePathname: () => "/backlog",
}));

import BacklogPage from "@/app/backlog/page";

describe("Backlog page", () => {
  test("renders heading", () => {
    render(<BacklogPage />);
    expect(
      screen.getByRole("heading", { name: /backlog/i })
    ).toBeInTheDocument();
  });
});
