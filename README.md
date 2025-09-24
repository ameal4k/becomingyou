BecomingYou Kanban — Take-Home Submission

deployed over at https://becomingyou-seven.vercel.app/

A lightweight, brand-aligned Kanban board with local-first state, drag-and-drop, backlog view, task detail/editing, filters & basic tests.

1. Overview

This app lets you:

Create, edit, delete, and reorder tasks

Drag tasks between Scheduled → In-Progress → Done (and sort within a column)

Open a focused task detail route with inline editing

Filter/sort the backlog by text, tag, assignee, and status

Persist everything locally (no backend required)

The interface mirrors the look & feel of Becoming You: custom fonts, color tokens, and typographic scale. All colors are Tailwind tokens, and backgrounds use --background (no pure white).

2. How to Run

# install

yarn

# dev

yarn dev

# typecheck + lint

yarn typecheck
yarn lint

# tests

yarn test

# build (Next.js production)

yarn build
yarn start

Note: The app uses the App Router. Favicon: use src/app/icon.png (512×512) or add a <link rel="icon" …> in src/app/head.tsx.

3. Tech & Dependencies

Next.js 14+ (App Router) — project structure, routing (/, /backlog, /task/[id])

TypeScript — types for tasks, store, and components

Tailwind CSS — design tokens and utilities; custom CSS vars for brand colors & gradients

Zustand (+ persist) — local-first state (tasks in localStorage)

@dnd-kit — accessible drag & drop between/within columns

Vitest + Testing Library — unit & component tests

Fonts:

Schibsted Grotesk (body), PP Editorial New Serif (headings), Geist Mono (code)

4. Project Structure
   /
   ├─ lib/
   │ ├─ types.ts # Task/Status types, labels
   │ ├─ store.ts # Zustand store (persisted)
   │ ├─ seed.ts # Demo tasks with positions
   │ └─ ui.ts # UI helpers (statusToCssVar, etc.)
   ├─ utils/
   │ └─ text.ts # small helpers (e.g., truncate)
   ├─ src/
   │ ├─ app/
   │ │ ├─ page.tsx # Board (Kanban)
   │ │ ├─ backlog/page.tsx # Backlog list with filters/sort
   │ │ └─ task/[id]/page.tsx # Task detail route (edit/delete)
   │ ├─ components/
   │ │ ├─ Board.tsx
   │ │ ├─ Column.tsx
   │ │ ├─ TaskCard.tsx
   │ │ ├─ TaskForm.tsx
   │ │ ├─ Modal.tsx
   │ │ ├─ Navbar.tsx
   │ │ └─ Footer.tsx
   │ └─ styles/
   │ └─ globals.css # tokens, fonts, headings, link styles, utilities
   ├─ tests/
   │ ├─ store.test.ts
   │ ├─ filters.test.ts
   │ ├─ status-maps.test.ts
   │ ├─ backlog.test.tsx
   │ ├─ taskcard.test.tsx
   │ └─ taskdetail.back.test.tsx
   └─ next.config.ts

5. Approaches & Reasoning

Brand-first UI. I wanted the interface to feel intuitive and congruent with the company’s branding. I started by cloning the live site’s visual language within Tailwind: custom fonts, editorial headings at ultralight weights, and a clean color system (--background, --foreground, plus brand colors).

Local-first state. I compared state options (Context/Reducer, Redux Toolkit, Zustand, Jotai, Valtio). Using AI Copilot, I asked GPT for trade-offs and picked Zustand for its minimalist API, great TypeScript story, and persist middleware (the assignment asks for local storage).

DnD. @dnd-kit gave fine-grained control: sortable lists within columns, custom collision strategies, and a global “dragging” cursor class so the grab/grabbing cursor persists across the viewport while dragging.

Componentization. I kept things modular (Board/Column/TaskCard/TaskForm/Modal) but intentionally light so it’s easy to follow. If this were production, I’d extract many elements to a serious design system and repeat less.

6. Functionality Notes

Board:

Drag tasks across columns and reorder within a column

“Add Task” opens a modal; new tasks append to the target column

Optional Delete mode toggles “×” buttons on cards (bulk clean-up)

Backlog:

Filter by text, tag, assignee

Sort by status (Scheduled / In-Progress / Done)

Status chip uses the same gradient system for continuity

Task detail:

Deep-link via /task/[id]

Inline edit in a modal, delete with back navigation that honors the ?from= query (board vs. backlog)

Persistence:

All tasks are persisted to localStorage; seed is loaded once then overridden as the user edits

7. Testing

What we tested

Store logic: add / update / move / remove, reordering/indexing

Filters & sorting: text, tag, assignee, combined, and status sort

Routing affordances: Backlog heading render; task detail “Back” behavior using ?from=

TaskCard link formation: ensures detail link includes the from param

Why these tests

They guard the core interactions and a few subtle regressions (e.g., URL params and filters).

I also authored tests while fixing small issues to lock behavior (“test-as-you-debug”).

How to run

yarn test

Note on experience: My biggest weakness going in was limited familiarity across test runners and DOM helpers. I spent ~1 hour reading and wiring Vitest + Testing Library. Worth it—the tests caught a few small issues (navigation, filters) early.

8. Time Spent

UI/Styling & brand alignment: ~1 hour

Core functionality (DnD, store, routing, filters, detail/edit): ~2 hours

Tests, linting, cleanup: ~1–1.5 hours

Total: <5 hours, with touch ups here and there while deploying to vercel and drafting this readme you're reading now!

9. If I Had More Time

Refactor to a small design system: formal Button, Input, Select, Badge, Card, etc., plus a Tailwind plugin for brand tokens and shared shadows/radii.

Pages for tags & assignees: list+detail drill-downs and per-entity views.

Metrics dashboard: React charts showing completions per assignee, and lead time from Scheduled → Done (time spent In-Progress).

Caveat: Kanban drag-and-drop can be noisy (people shuffle cards casually), so collecting reliable timings would require UX constraints (e.g., explicit “start work”/“finish” actions) or tolerance rules before recording a state transition.

10. Accessibility & UX

Text scale: headings are ultralight but large, body 16px with a 14px secondary size for lists/details.

Keyboard focus is visible; links underline on hover.

DnD is pointer-based; for full accessibility, I’d add keyboard reordering affordances or an alternative control.

11. Known Trade-offs

No backend; localStorage only (as required).

Minimal error states; a production version would add robust form validation and optimistic UI rollback.

DnD overlay is intentionally simple to favor clarity over animation flair.

12. Deployment

https://becomingyou-seven.vercel.app/

13. Personal Notes (for reviewers)

zustand was unknown to me, but monitoring gpt closely, my rule was as long as I understand what we were working with conceptually, and could change on the fly by hand, I trusted gpt as "live docs". I would tell begineers that taking the time to understand (undzustand! lol) the fundamentals of global state and state management - reducers etc. - is really a prerequisite for saddling up with ANY state management library or novel toolkit like zustand.
