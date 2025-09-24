"use client";

import { useState } from "react";
import type { Status, Task } from "lib/types";

export type TaskInput = Omit<Task, "createdAt" | "updatedAt">;

export default function TaskForm({
  initial,
  onSubmit,
  submitLabel = "Create task",
}: {
  initial?: Partial<TaskInput>;
  onSubmit: (data: TaskInput) => void;
  submitLabel?: string;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [assignee, setAssignee] = useState(initial?.assignee ?? "");
  const [status, setStatus] = useState<Status>(initial?.status ?? "scheduled");
  const [description, setDescription] = useState(initial?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    onSubmit({
      id: initial?.id ?? `t-${Math.random().toString(36).slice(2, 8)}`,
      title: t,
      assignee: assignee || undefined,
      description: description || undefined,
      tags: initial?.tags ?? [],
      dueDate: initial?.dueDate,
      status,
      // createdAt/updatedAt added in store
    } as TaskInput);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm">
        <span className="mb-1 block">Title</span>
        <input
          className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Wire up drag-and-drop"
          required
        />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block">Assignee</span>
          <input
            className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Optional"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block">Status</span>
          <select
            className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block">Description</span>
        <textarea
          className="w-full rounded-xl border  border-black/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-blue"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details…"
        />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2  border-burnt bg-cream px-3 py-2 text-sm font-bold text-burnt hover:bg-cream/80"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
