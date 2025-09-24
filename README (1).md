# BecomingYou Kanban (Take‑Home)

A lightweight Kanban board built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Zustand** (persist to `localStorage`), and **@dnd-kit** for drag & drop. Includes a Backlog list view with filters, a task detail route, create/edit/delete, and local persistence.

> **Note to reviewer:** This project intentionally mirrors the visual style of Becoming You’s site for familiarity. All brand assets remain property of Becoming You Media, LLC.

---

## 👟 Quickstart

```bash
# 1) Install
yarn install

# 2) Dev
yarn dev

# 3) Build / Start
yarn build
yarn start

# 4) Lint
yarn lint

# 5) Test (see Testing section for details)
yarn test
```

**Node:** use **Node ≥ 20.19** (or ≥ 22.12) for Vitest compatibility.  
**Package manager:** Yarn Classic (v1).

---

## 🔗 Deployed URL / Demo

- **Vercel:** _<add deployment URL here>_
- **Short demo (GIF/loom):** _<add link here>_

---

## ✅ Feature Checklist (per brief)

- [x] Kanban board with **Scheduled / In Progress / Done**
- [x] **Backlog** / list page with filters (text, assignee, tag)
- [x] **Create / Edit / Delete** tasks (modal form)
- [x] **Move** tasks between columns (drag & drop)
- [x] **Task detail** dynamic route (`/task/[id]`)
- [x] **Responsive** styles and **empty states**
- [x] Data persisted to **localStorage**
- [x] **10–15 seeded** sample tasks
- [ ] Minimal automated tests (_included examples; feel free to add more_)
- [ ] Any extra polish you want to call out: _<add notes>_

---

## 🧭 Project Structure

```
.
├─ lib/
│  ├─ types.ts          # Task & Status types, helpers
│  ├─ store.ts          # Zustand store (+ persist to localStorage)
│  └─ seed.ts           # 10–15 sample tasks used on first run
├─ public/
│  ├─ logo.svg
│  └─ logo_inverted.svg
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ globals.css    # Tailwind v4 + brand tokens + fonts
│  │  ├─ page.tsx       # Board page (columns + DnD)
│  │  ├─ backlog/
│  │  │  └─ page.tsx    # Backlog list + Filters
│  │  └─ task/
│  │     └─ [id]/
│  │        └─ page.tsx # Task detail + Edit/Delete
│  └─ components/
│     ├─ Navbar.tsx
│     ├─ Footer.tsx
│     ├─ Board.tsx
│     ├─ Column.tsx
│     ├─ TaskCard.tsx
│     ├─ Modal.tsx
│     ├─ TaskForm.tsx
│     └─ Filters.tsx
└─ README.md
```

> **Path aliases:** `@/*` → `./src/*` (see `tsconfig.json`). Root-level imports like `lib/store` work via `baseUrl: "."`.

---

## 🧠 Architecture & Data

### State management

- **Zustand** store (`lib/store.ts`) holds `tasks: Task[]` + **actions**:
  - `addTask(task)`, `updateTask(id, patch)`, `removeTask(id)`
  - `moveTask(id, status)` — used by DnD
  - `resetDemo(seed)` — replace all with seeded data
- `persist` middleware saves to **localStorage** so state survives refreshes.
  - Keys used:
    - `kanban-board-v1` — the persisted store
    - `kanban-seeded-v1` — one-time seed guard flag

### Data model (simplified)

```ts
export type Status = 'scheduled' | 'in-progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags?: string[];
  status: Status;
  dueDate?: string; // ISO string (optional)
  createdAt: number; // epoch ms for localStorage friendliness
  updatedAt: number;
};
```

### Routing

- `/` — **Board** (Kanban columns, drag & drop, “New Task” modal)
- `/backlog` — **Backlog** list with **Filters** (search, assignee, tag)
- `/task/[id]` — **Task detail** with **Edit** modal and **Delete**

**Contextual Back:** clicking a card passes `?from=<current-path>`. The detail page respects `from` for a contextual “Back”.

### Drag & drop

- **@dnd-kit/core** with mouse & touch sensors
- Columns are **droppable** (`id` matches `status`), cards are **draggable**
- On `onDragEnd`, if dropped onto a column, we call `moveTask(id, status)`

---

## 🎨 Styling

- **Tailwind v4** with brand tokens in `src/app/globals.css`
- Fonts:
  - **Schibsted Grotesk** — body text
  - **ppEditorialNewSerif** — headings (weight 200, responsive sizes)
  - **Geist Mono** — code
- Reusable tokens for colors, border-2radius, and shadows:
  - `--color-cream`, `--color-burnt`, `--radius-xl`, `--shadow-elevated`, etc.
- Utility class `.bg-brand-gradient` (cream → background) for hero/accents
- Accessibility-friendly link styles (underline on hover, no default blue)

---

## ♿ Accessibility & ♻️ Performance

- Semantic HTML in components; buttons/links have labels and focus states
- Whole‑card drag (non‑link areas) for easier hit‑target; links/buttons don’t start drag
- Keyboard: modal supports Escape to close (can add focus trap if desired)
- Light bundle: Zustand + dnd-kit only; no heavy UI frameworks
- React 19 gotcha addressed: **stable selectors** with `useMemo`

> _Add any Lighthouse notes or additional a11y checks here._

---

## 🧪 Testing

**Stack:** Vitest + Testing Library + JSDOM

Add these scripts to `package.json` if you haven’t yet:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage"
  }
}
```

### What’s covered / planned

- **Store unit tests** (pure functions):
  - `addTask` creates with timestamps
  - `updateTask` mutates fields (title/status/description)
  - `moveTask` changes column
  - `removeTask` deletes
- **Filters** logic (optional): given a list, the filter returns expected subset
- **Component smoke tests** (optional): Board renders three columns; TaskCard shows title/assignee

#### Example: `tests/store.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { create } from 'zustand';
import type { Task } from '../lib/types';

type BoardState = {
  tasks: Task[];
  addTask: (t: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  moveTask: (id: string, status: Task['status']) => void;
};

function makeStore() {
  // isolated in-memory store for unit tests
  return create<BoardState>()((set) => ({
    tasks: [],
    addTask: (t) =>
      set((s) => ({
        tasks: [...s.tasks, { ...t, createdAt: 1, updatedAt: 1 }],
      })),
    updateTask: (id, patch) =>
      set((s) => ({
        tasks: s.tasks.map((t) =>
          t.id === id ? { ...t, ...patch, updatedAt: 2 } : t
        ),
      })),
    removeTask: (id) =>
      set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
    moveTask: (id, status) =>
      set((s) => ({
        tasks: s.tasks.map((t) =>
          t.id === id ? { ...t, status, updatedAt: 3 } : t
        ),
      })),
  }));
}

describe('board store', () => {
  test('add / update / move / remove', () => {
    const useTest = makeStore();
    const { addTask, updateTask, moveTask, removeTask } = useTest.getState();

    addTask({ id: 't1', title: 'A', status: 'scheduled' } as Task);
    expect(useTest.getState().tasks).toHaveLength(1);

    updateTask('t1', { title: 'A+' });
    expect(useTest.getState().tasks[0].title).toBe('A+');

    moveTask('t1', 'in-progress');
    expect(useTest.getState().tasks[0].status).toBe('in-progress');

    removeTask('t1');
    expect(useTest.getState().tasks).toHaveLength(0);
  });
});
```

> _Prefer black‑box tests against the real store? Export your store’s actions and mock `localStorage`. The above shows an isolated in‑memory approach for speed._

**Run tests**

```bash
yarn test          # headless
yarn test:ui       # Vitest UI (nice for demos)
yarn coverage      # coverage summary
```

---

## 🧰 Tech Decisions (brief notes)

- **Zustand** over Context/Redux — tiny API, selectors, `persist` middleware.
- **@dnd-kit** — ergonomic and unopinionated.
- **LocalStorage** over server — aligns with take‑home scope, zero backend.
- **React 19**: stable selectors + `useMemo` to avoid snapshot loops.
- **Tailwind v4** — tokens & utilities for fast brand replication.

> _Add any tradeoffs or alternatives you considered._

---

## 📦 Seeding & Resetting Data

On first run, the app seeds `lib/seed.ts` into the store and sets a guard flag.

- **Clear data:** DevTools → Application → Local Storage → delete keys:
  - `kanban-board-v1`
  - `kanban-seeded-v1`
- Or render a temporary “Reset demo data” button calling `resetDemo(seedTasks)`.

---

## 📱 Responsiveness & States

- Mobile‑first layout; grid collapses to single column
- Empty states:
  - Columns: “No tasks yet”
  - Backlog: “No tasks match your filters”
  - Detail: “Task not found”
- Errors: client-side only; invalid task id handled on the detail route

---

## ⏱️ Time Spent

- **Design/Styling:** _<fill in>_
- **State & CRUD:** _<fill in>_
- **DnD:** _<fill in>_
- **Backlog/Filters:** _<fill in>_
- **Detail route:** _<fill in>_
- **Testing & docs:** _<fill in>_

---

## 🚧 If I Had More Time

- Keyboard DnD accessibility (roving focus + space/arrow to move cards)
- Reorder within a column (sortable strategy) + nicer drop previews
- Tag management UI (create/remove chips)
- Date picker and due‑date sorts
- Basic analytics (task throughput)
- More tests (component interactions, DnD edge cases)

---

## 📜 License / Attribution

- Fonts, logos, and assets owned by **Becoming You Media, LLC**.  
  Used here for evaluation only; not for public distribution.

---

## 🙋 Notes from me

- _<Anything you want to call out to reviewers — assumptions, shortcuts, nice touches>_
