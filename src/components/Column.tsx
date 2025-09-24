// src/components/Column.tsx
"use client";

import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { STATUS_LABEL, type Status } from "lib/types";
import { useBoard } from "lib/store";
import TaskCard from "./TaskCard";
import { statusToCssVar, type CSSVarStyle } from "lib/ui";

export default function Column({ status, deleteMode = false }: { status: Status; deleteMode?: boolean }) {
  const allTasks = useBoard((s) => s.tasks);
  const removeTask = useBoard((s) => s.removeTask);

  const tasks = useMemo(
    () => allTasks.filter((t) => t.status === status).sort((a, b) => a.position - b.position),
    [allTasks, status]
  );

  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      className={`rounded-2xl border-2 border-black/10 bg-background transition-colors ${isOver ? "outline outline-2 outline-blue/40" : ""}`}
    >
      <header 
     style={{ "--col": statusToCssVar(status) } as CSSVarStyle}
      className="flex items-center rounded-tl-2xl rounded-tr-2xl justify-between px-4 py-3  border-black/10 bg-status-gradient "
      
      >
        <h3 className="font-editorial text-foreground">{STATUS_LABEL[status]}</h3>
      </header>
      <div className="p-4 space-y-3 min-h-28">
        {tasks.length === 0 ? (
          <div className="text-secondary">No tasks yet</div>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              deleteMode={deleteMode}
              onDelete={() => removeTask(t.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
