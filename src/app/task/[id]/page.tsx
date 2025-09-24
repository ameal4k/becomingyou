// src/app/task/[id]/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useBoard } from "lib/store";
import Modal from "@/components/Modal";
import TaskForm, { type TaskInput } from "@/components/TaskForm";
import { statusToCssVar, type CSSVarStyle } from "lib/ui";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>(); // route id is stable
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from"); // "/backlog" or "/"

  const allTasks = useBoard((s) => s.tasks);
  const updateTask = useBoard((s) => s.updateTask);
  const removeTask = useBoard((s) => s.removeTask);

  const task = useMemo(() => allTasks.find((t) => t.id === id), [allTasks, id]);
  const [open, setOpen] = useState(false);

  if (!task) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-black/10 bg-background p-6 text-center">
          <h1 className="font-editorial text-2xl text-foreground">Task not found</h1>
          <p className="text-secondary mt-2">The task you’re looking for doesn’t exist.</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <Link href="/" className="underline">← Back to board</Link>
            <Link href="/backlog" className="underline">Back to backlog</Link>
          </div>
        </div>
      </main>
    );
  }

  // Use the stable route id for mutations to avoid "possibly undefined"
  function handleSave(data: TaskInput) {
    updateTask(id, data);
    setOpen(false);
  }

  function handleDelete() {
    removeTask(id);
    if (from === "/" || from === "/backlog") router.push(from);
    else router.push("/backlog");
  }

  function handleBack() {
    if (from === "/" || from === "/backlog") router.push(from);
    else router.back();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={handleBack}
            className="text-sm underline cursor-pointer underline-offset-4 text-gray hover:text-foreground"
          >
            ← Back
          </button>

          <h1 className="mt-2 font-editorial text-4xl text-foreground">{task.title}</h1>
          <div className="mt-2 text-sm text-gray">
            <div><b>Assignee:</b> {task.assignee ?? "Unassigned"}</div>
            <div>
              <b>Status:</b>{" "}
              <span
                className="text-xs rounded-full border whitespace-nowrap border-black/10 px-2 py-0.5 bg-status-gradient"
                style={{ "--col": statusToCssVar(task.status) } as CSSVarStyle}
                aria-label={`Status: ${task.status}`}
              >
                {task.status}
              </span>
            </div>
            <div><b>Tags:</b> {(task.tags ?? []).join(", ") || "none"}</div>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            className="inline-flex items-center gap-2 cursor-pointer rounded-xl border-2 border-burnt bg-cream px-3 py-2 text-sm font-bold text-burnt hover:bg-cream/80"
            onClick={() => setOpen(true)}
          >
            Edit
          </button>
          <button
            className="rounded-xl border cursor-pointer border-black/10 px-3 py-2 text-sm text-gray hover:bg-black/5"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-black/10 bg-background p-4">
        <h4 className="font-editorial text-xl text-foreground">Description</h4>
        <p className="mt-2 text-gray">
          {task.description ?? "No description."}
        </p>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit task">
        <TaskForm initial={task} submitLabel="Save changes" onSubmit={handleSave} />
      </Modal>
    </main>
  );
}
