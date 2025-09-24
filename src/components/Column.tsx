"use client";

import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { STATUS_LABEL, type Status } from "lib/types";
import { useBoard } from "lib/store";
import TaskCard from "./TaskCard";
import { statusToCssVar } from "lib/ui";

export default function Column({ status }: { status: Status }) {
  const all = useBoard((s) => s.tasks);
  const tasks = useMemo(
    () => all.filter((t) => t.status === status).sort((a, b) => a.position - b.position),
    [all, status]
  );

  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      className={`rounded-2xl border  border-black/10 bg-background transition-colors`}
    >
  <header
        className="flex items-center justify-between px-4 py-3 border-b border-black/10 rounded-t-2xl bg-status-gradient"
        style={{ ["--col" as any]: statusToCssVar(status) }}
      >
        <h3 className="font-editorial text-foreground">{STATUS_LABEL[status]}</h3>
      </header>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-4 space-y-3 min-h-28 overflow-visible isolate">
          {tasks.length === 0 ? (
            <div className="text-secondary">No tasks yet</div>
          ) : (
            tasks.map((t) => <TaskCard key={t.id} task={t} />)
          )}
        </div>
      </SortableContext>
    </section>
  );
}
