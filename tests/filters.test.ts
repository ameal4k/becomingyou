import { describe, expect, test } from "vitest";

type T = {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags?: string[];
};

function applyFilters(
  tasks: T[],
  { q = "", tag = "", assignee = "" }: { q?: string; tag?: string; assignee?: string }
) {
  const ql = q.toLowerCase();
  return tasks
    .filter((t) =>
      q
        ? (t.title + " " + (t.description ?? "")).toLowerCase().includes(ql)
        : true
    )
    .filter((t) => (tag ? (t.tags ?? []).includes(tag) : true))
    .filter((t) => (assignee ? t.assignee === assignee : true));
}

describe("filters", () => {
  const data: T[] = [
    { id: "1", title: "Design columns", description: "ui layout", tags: ["ui"], assignee: "A" },
    { id: "2", title: "Implement store", description: "zustand state", tags: ["state"], assignee: "B" },
    { id: "3", title: "Drag handle", description: "dnd", tags: ["ui", "drag"], assignee: "A" },
  ];

  test("text search matches title or description (case-insensitive)", () => {
    expect(applyFilters(data, { q: "store" })).toHaveLength(1);
    expect(applyFilters(data, { q: "UI" })).toHaveLength(1);
  });

  test("tag filter", () => {
    expect(applyFilters(data, { tag: "ui" })).toHaveLength(2);
    expect(applyFilters(data, { tag: "state" })).toHaveLength(1);
  });

  test("assignee filter", () => {
    expect(applyFilters(data, { assignee: "A" })).toHaveLength(2);
    expect(applyFilters(data, { assignee: "B" })).toHaveLength(1);
  });

  test("combined filters (text + tag + assignee)", () => {
    const out = applyFilters(data, { q: "drag", tag: "drag", assignee: "A" });
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("3");
  });
});
