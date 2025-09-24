// src/components/TaskCard.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "lib/types";
import { statusToCssVar, type CSSVarStyle } from "lib/ui";
import { truncate } from "../../utils/text";

export default function TaskCard({
  task,
  deleteMode = false,
  onDelete,
}: {
  task: Task;
  deleteMode?: boolean;
  onDelete?: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({
    id: task.id,
    data: { type: "task", status: task.status, taskId: task.id },
  });

  const pathname = usePathname();
  const href = { pathname: `/task/${task.id}`, query: { from: pathname } };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onPointerDownCapture={(e) => {
        const el = e.target as HTMLElement;
        if (el.closest("a,button,input,select,textarea,[data-draggable-ignore='true']")) e.stopPropagation();
      }}
      className={[
        "task-card",
        "bg-background",
        "relative rounded-xl border-2 border-black/10 p-3 bg-status-gradient shadow-sm",
        "cursor-grab active:cursor-grabbing select-none touch-none transform-gpu",
        isDragging ? "opacity-0 z-[1] transition-none" : "z-0 hover:-translate-y-px transition-transform",
      ].join(" ")}
      style={{
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        willChange: transform ? "transform" : undefined,
      }}
      role="listitem"
    >
      {/* Delete chip (only when delete mode is active) */}
      {deleteMode && (
        <button
          type="button"
          data-draggable-ignore="true"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete?.();
          }}
          className="absolute -right-2 -top-2 cursor-pointer inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-burnt bg-cream text-burnt hover:bg-cream/80"
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          ×
        </button>
      )}

      <div className="flex items-start justify-between gap-2">
        <Link
          href={href}
          className="font-editorial capitalize text-foreground hover:underline underline-offset-4"
          data-draggable-ignore="true"
        >
          {truncate(task.title, 30)}
        </Link>

        <span
          className="text-xs rounded-full whitespace-nowrap border-2 border-black/10 px-2 py-0.5 bg-status-gradient"
          style={{ "--col": statusToCssVar(task.status) } as CSSVarStyle}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-1 text-xs text-foreground/70">
        {task.assignee ?? "Unassigned"}
        {task.tags?.length ? ` · ${task.tags.join(", ")}` : ""}
      </div>

      {task.description ? (
        <p className="mt-2 text-sm text-gray">{truncate(task.description, 120)}</p>
      ) : null}
    </div>
  );
}
