"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "lib/types";
import { statusToCssVar } from "lib/ui";
import { truncate } from "../../utils/text";


export default function TaskCard({ task }: { task: Task }) {


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
        "relative rounded-xl border  border-black/10 p-3 bg-status-gradient shadow-sm",
        "cursor-grab active:cursor-grabbing select-none touch-none transform-gpu",
        isDragging ? "opacity-0 z-[1] transition-none" : "z-0 hover:translate-y-[-1px] transition-transform",
      ].join(" ")}
      style={{
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        willChange: transform ? "transform" : undefined,
      }}
      role="listitem"
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={href}
          className="font-editorial text-foreground hover:underline underline-offset-4"
          data-draggable-ignore="true"
        >
          {task.title}
        </Link>
        <span
          className="text-xs rounded-full border  border-black/10 px-2 py-0.5 bg-status-gradient"
          style={{ ["--col" as any]: statusToCssVar(task.status) }}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-1 text-xs text-foreground/70">
        {task.assignee ?? "Unassigned"}
        {task.tags?.length ? ` · ${task.tags.join(", ")}` : ""}
      </div>

      {task.description ? <p className="mt-2 text-sm text-gray">{truncate(task.description, 120)}</p> : null}
    </div>
  );
}
