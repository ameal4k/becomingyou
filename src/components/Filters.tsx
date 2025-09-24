// src/components/Filters.tsx
"use client";

type FiltersState = { q: string; tag: string; assignee: string; status: "" | "scheduled" | "in-progress" | "done" };

export default function Filters({
  value,
  onChange,
  tags,
  assignees,
}: {
  value: FiltersState;
  onChange: (v: FiltersState) => void;
  tags: string[];
  assignees: string[];
}) {
  return (
    <div className="rounded-2xl border  border-black/10 bg-background p-4">
      <form className="grid gap-3 md:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
        {/* text search */}
        <label className="text-sm">
          <span className="block mb-1 text-gray">Search</span>
          <input
            type="text"
            placeholder="Title or description…"
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
          />
        </label>

        {/* tag dropdown */}
        <label className="text-sm">
          <span className="block mb-1 text-gray">Tag</span>
          <select
            value={value.tag}
            onChange={(e) => onChange({ ...value, tag: e.target.value })}
            className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
          >
            <option value="">All tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* assignee dropdown */}
        <label className="text-sm">
          <span className="block mb-1 text-gray">Assignee</span>
          <select
            value={value.assignee}
            onChange={(e) => onChange({ ...value, assignee: e.target.value })}
            className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
          >
            <option value="">All assignees</option>
            {assignees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        {/* status dropdown */}
        <label className="text-sm">
          <span className="block mb-1 text-gray">Status</span>
          <select
            value={value.status}
            onChange={(e) => onChange({ ...value, status: e.target.value as FiltersState["status"] })}
            className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
          >
            <option value="">All statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </form>
    </div>
  );
}
