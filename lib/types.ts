export type Status = "scheduled" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags?: string[];
  dueDate?: string; // ISO date
  status: Status;
    position: number;   
  createdAt: number;
  updatedAt: number;
}

export const STATUS_LABEL: Record<Status, string> = {
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  done: "Done",
};

export const demoTasks: Task[] = [
  {
    id: "t-1",
    title: "Design columns",
    description: "Structure board UI",
    assignee: "Emil",
    tags: ["ui", "layout"],
    status: "scheduled",
    position: 0,                   // 👈 add positions
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "t-2",
    title: "Implement store",
    assignee: "Ava",
    tags: ["state"],
    status: "in-progress",
    position: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "t-3",
    title: "Hook up DnD",
    assignee: "Max",
    tags: ["drag"],
    status: "done",
    position: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
