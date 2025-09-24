// src/components/Board.tsx
"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import { useBoard } from "lib/store";
import type { Status, Task } from "lib/types";
import Column from "./Column";
import Modal from "@/components/Modal";
import TaskForm, { type TaskInput } from "@/components/TaskForm";

function statusOfTask(tasks: Task[], id: string): Status | null {
  return tasks.find((t) => t.id === id)?.status ?? null;
}
function indexInStatus(tasks: Task[], status: Status, id: string): number {
  const list = tasks
    .filter((t) => t.status === status)
    .sort((a, b) => a.position - b.position);
  return list.findIndex((t) => t.id === id);
}
function nanoId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function Board() {
  const tasks = useBoard((s) => s.tasks);
  const addTask = useBoard((s) => s.addTask);
  const reorderWithin = useBoard((s) => s.reorderWithin);
  const moveTo = useBoard((s) => s.moveTo);

  const [open, setOpen] = useState(false);

  function handleCreate(data: TaskInput) {
    const status: Status = data.status ?? "scheduled";
    const pos = tasks.filter((t) => t.status === status).length; // append to end
    const now = Date.now();

    addTask({
      id: `t-${nanoId()}`,
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      tags: data.tags,
      dueDate: data.dueDate,
      status,
      position: pos,
      createdAt: now,
      updatedAt: now,
    });
    setOpen(false);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const fromStatus = statusOfTask(tasks, activeId);
    if (!fromStatus) return;

    // Dropped on a column → append at end
    if (overId === "scheduled" || overId === "in-progress" || overId === "done") {
      const toStatus = overId as Status;
      const toIdx = tasks.filter((t) => t.status === toStatus).length;
      if (toStatus === fromStatus) return; // no-op
      moveTo(activeId, toStatus, toIdx);
      return;
    }

    // Dropped on another task
    const overStatus = statusOfTask(tasks, overId);
    if (!overStatus) return;

    if (fromStatus === overStatus) {
      reorderWithin(fromStatus, activeId, overId);
    } else {
      const toIdx = indexInStatus(tasks, overStatus, overId);
      moveTo(activeId, overStatus, toIdx < 0 ? 0 : toIdx);
    }
  }

  return (
    <>
      {/* Top bar actions */}
      <h1>Emil's Kanban Board</h1>
      <p>A lightweight kanban board for planning and tracking work. Drag tasks between Scheduled, In-Progress, and Done (drag-sort within columns as well), quickly create or edit details, and open a focused task view when you need it. Filter and sort by text, tags, or assignee—and everything saves locally in your browser, no account required.</p>
      <div className="mb-4 flex items-center justify-end">
        <button
          className="inline-flex items-center gap-2 cursor-pointer rounded-xl border-2  border-burnt bg-cream px-3 py-2 text-sm font-bold text-burnt hover:bg-cream/80"
          onClick={() => setOpen(true)}
        >
          Add Task
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <section className="relative isolate grid gap-4 md:grid-cols-3">
          <Column status="scheduled" />
          <Column status="in-progress" />
          <Column status="done" />
        </section>
      </DndContext>

      {/* Create task modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Create task">
        <TaskForm submitLabel="Create task" onSubmit={handleCreate} />
      </Modal>
    </>
  );
}
