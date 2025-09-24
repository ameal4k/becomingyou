// src/lib/seed.ts
import type { Task } from "./types";

const now = Date.now();

export const seedTasks: Task[] = [
  // SCHEDULED (positions 0..5)
  { id: "t-1",  title: "Design columns",         description: "Structure board UI", assignee: "Emil", tags: ["ui","layout"], status: "scheduled",   position: 0, createdAt: now, updatedAt: now },
  { id: "t-4",  title: "Task detail route",      assignee: "Emil", tags: ["routing"],                     status: "scheduled",   position: 1, createdAt: now, updatedAt: now },
  { id: "t-5",  title: "Filters bar",            assignee: "Ava",  tags: ["filters"],                     status: "scheduled",   position: 2, createdAt: now, updatedAt: now },
  { id: "t-7",  title: "Delete flows",           assignee: "Emil", tags: ["crud"],                        status: "scheduled",   position: 3, createdAt: now, updatedAt: now },
  { id: "t-10", title: "Backlog list view",      assignee: "Emil", tags: ["routing","list"],              status: "scheduled",   position: 4, createdAt: now, updatedAt: now },
  { id: "t-11", title: "Tag chips",              assignee: "Ava",  tags: ["ui"],                          status: "scheduled",   position: 5, createdAt: now, updatedAt: now },

  // IN-PROGRESS (positions 0..3)
  { id: "t-2",  title: "Implement store",        assignee: "Ava",  tags: ["state"],                       status: "in-progress", position: 0, createdAt: now, updatedAt: now },
  { id: "t-6",  title: "Edit task modal",        assignee: "Max",  tags: ["crud"],                        status: "in-progress", position: 1, createdAt: now, updatedAt: now },
  { id: "t-9",  title: "Mobile polish",          assignee: "Max",  tags: ["responsive"],                  status: "in-progress", position: 2, createdAt: now, updatedAt: now },
  { id: "t-12", title: "Link cards to detail",   assignee: "Max",  tags: ["routing"],                     status: "in-progress", position: 3, createdAt: now, updatedAt: now },

  // DONE (positions 0..1)
  { id: "t-3",  title: "Hook up DnD",            assignee: "Max",  tags: ["drag"],                        status: "done",        position: 0, createdAt: now, updatedAt: now },
  { id: "t-8",  title: "Empty states",           assignee: "Ava",  tags: ["ux"],                          status: "done",        position: 1, createdAt: now, updatedAt: now },
];
