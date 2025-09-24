// src/app/backlog/page.tsx
"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Filters from "@/components/Filters";
import { useBoard } from "lib/store";
import { statusToCssVar } from "lib/ui";

type FiltersState = { q: string; tag: string; assignee: string; status: "" | "scheduled" | "in-progress" | "done" };

export default function BacklogPage() {
  const pathname = usePathname();
  const all = useBoard((s) => s.tasks);

  // unique tags & assignees for dropdowns
  const { tags, assignees } = useMemo(() => {
    const tagSet = new Set<string>();
    const assigneeSet = new Set<string>();
    for (const t of all) {
      (t.tags ?? []).forEach((tag) => tagSet.add(tag));
      if (t.assignee) assigneeSet.add(t.assignee);
    }
    return {
      tags: Array.from(tagSet).sort(),
      assignees: Array.from(assigneeSet).sort(),
    };
  }, [all]);

  // filter state (status added)
  const [filters, setFilters] = useState<FiltersState>({
    q: "",
    tag: "",
    assignee: "",
    status: "",
  });

  // filtered list
  const list = useMemo(() => {
    const q = filters.q.toLowerCase();
    return [...all]
      .filter((t) => (q ? (t.title + " " + (t.description ?? "")).toLowerCase().includes(q) : true))
      .filter((t) => (filters.tag ? (t.tags ?? []).includes(filters.tag) : true))
      .filter((t) => (filters.assignee ? t.assignee === filters.assignee : true))
      .filter((t) => (filters.status ? t.status === filters.status : true))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [all, filters]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="font-editorial text-3xl text-foreground">Backlog</h1>

      <Filters
        value={filters}
        onChange={setFilters}
        tags={tags}
        assignees={assignees}
      />

      {list.length === 0 ? (
        <div className="rounded-xl border  border-black/10 bg-background p-6 text-center text-secondary">
          No tasks match your filters.
        </div>
      ) : (
        <ul className="divide-y divide-black/10 rounded-xl border  border-black/10 bg-background">
          {list.map((t) => (
            <li key={t.id} className="relative p-4 pr-28 hover:bg-black/5">
              {/* badge in top-right */}
              <span
                className="absolute right-4 top-4 text-xs rounded-full border  border-black/10 px-2 py-0.5 bg-status-gradient"
                style={{ ["--col" as any]: statusToCssVar(t.status) }}
                aria-label={`Status: ${t.status}`}
              >
                {t.status}
              </span>

              <Link
                href={{ pathname: `/task/${t.id}`, query: { from: pathname } }}
                className="font-editorial text-foreground hover:underline underline-offset-4"
              >
                {t.title}
              </Link>
              <div className="text-xs text-gray mt-1">
                {t.assignee ?? "Unassigned"} · {(t.tags ?? []).join(", ") || "no tags"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
