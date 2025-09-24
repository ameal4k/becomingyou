
import type { Task } from "./types";

const now = Date.now();

export const seedTasks: Task[] = [
  // ───────────── SCHEDULED (positions 0..7)
  {
    id: "t-101",
    title: "Homepage hero refresh",
    description:
      "Redesign the hero section to better communicate the Becoming You value prop. Swap the static image for an editorial-style typographic lockup, add a succinct subhead, and include two CTAs (Primary: Start Your Plan, Secondary: Learn More). Prepare mobile-specific type sizes and spacing.",
    assignee: "Emil",
    tags: ["ui", "layout", "marketing"],
    status: "scheduled",
    position: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-102",
    title: "Content calendar: Q4 outline",
    description:
      "Draft a week-by-week outline of long-form essays, short blog posts, and newsletter themes for Q4. Align topics with the upcoming course launch and the mindset series. Include proposed titles, one-sentence summaries, and target keywords.",
    assignee: "Ava",
    tags: ["content", "seo", "planning"],
    status: "scheduled",
    position: 1,
    createdAt: now,
    updatedAt: now,
    dueDate: new Date(now + 1000 * 60 * 60 * 24 * 7).toISOString(), // +7d
  },
  {
    id: "t-103",
    title: "Cohort landing page A/B test",
    description:
      "Set up an A/B test for the cohort sign-up page to compare a long-form narrative against a concise, benefit-first layout. Track CTA clicks, scroll depth, and sign-up conversion. Provide experiment plan and success criteria.",
    assignee: "Max",
    tags: ["growth", "experimentation", "copy"],
    status: "scheduled",
    position: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-104",
    title: "Partner outreach starter kit",
    description:
      "Create a lightweight outreach kit for wellness partners: one-pager PDF, short intro email templates, and a Notion FAQ. Emphasize audience fit, the editorial voice, and the outcomes users report.",
    assignee: "Ava",
    tags: ["ops", "partnerships", "docs"],
    status: "scheduled",
    position: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-105",
    title: "Onboarding email flow v1",
    description:
      "Map and write a 4-email onboarding sequence: Day 0 welcome, Day 2 quick win, Day 5 deeper story, Day 10 invite to cohort. Keep tone editorial but actionable; add soft CTAs and a plain-text variant.",
    assignee: "Emil",
    tags: ["email", "lifecycle", "copy"],
    status: "scheduled",
    position: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-106",
    title: "Brand guidelines (type & color)",
    description:
      "Prepare a slim brand guide focusing on typography scales (Editorial for headings, Schibsted for body) and the core palette (cream, burnt, lime, blue). Include spacing rules and examples for badges and callouts.",
    assignee: "Emil",
    tags: ["brand", "design", "docs"],
    status: "scheduled",
    position: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-107",
    title: "Customer interviews: screener",
    description:
      "Draft a short screener survey to recruit 8–10 users for 30-minute interviews about planning habits. Aim for a mix of new sign-ups and returning readers. Include consent language and scheduling link.",
    assignee: "Ava",
    tags: ["research", "ux", "ops"],
    status: "scheduled",
    position: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-108",
    title: "Legal review: TOS & Privacy",
    description:
      "Collect current Terms of Service and Privacy Policy, annotate areas that mention data retention and cookies, and flag anything that needs update for analytics and email consent. Prepare a redline packet.",
    assignee: "Max",
    tags: ["legal", "compliance", "ops"],
    status: "scheduled",
    position: 7,
    createdAt: now,
    updatedAt: now,
  },

  // ───────────── IN-PROGRESS (positions 0..4)
  {
    id: "t-201",
    title: "Kanban board polish",
    description:
      "Tighten spacing, improve drag hints, and align tokenized colors with the editorial style. Add subtle gradients for column headers and badges that carry through to task cards on hover.",
    assignee: "Emil",
    tags: ["ui", "frontend"],
    status: "in-progress",
    position: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-202",
    title: "Newsletter template rebuild",
    description:
      "Rebuild the newsletter template in a mobile-first structure with bulletproof buttons and system fonts fallback. Keep the opening paragraph layout from the site and include a plaintext companion.",
    assignee: "Ava",
    tags: ["email", "templates"],
    status: "in-progress",
    position: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-203",
    title: "Analytics dashboard MVP",
    description:
      "Create a simple Notion/Looker-style dashboard for top-of-funnel (sessions, CTR, sign-ups) and engagement (read time, return visits). Start with weekly rollups and a single sparklines view.",
    assignee: "Max",
    tags: ["data", "analytics"],
    status: "in-progress",
    position: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-204",
    title: "SEO pass on cornerstone essays",
    description:
      "Do a light SEO edit on three cornerstone posts: tighten titles, add descriptive H2s, internal links to cohort page, and alt text on images. Keep the editorial voice intact.",
    assignee: "Ava",
    tags: ["seo", "content"],
    status: "in-progress",
    position: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "t-205",
    title: "Task detail view refinement",
    description:
      "Polish the task detail route with a clear back link, inline edit controls, and consistent badge styling. Ensure keyboard focus states and ARIA labels are correct.",
    assignee: "Emil",
    tags: ["frontend", "a11y"],
    status: "in-progress",
    position: 4,
    createdAt: now,
    updatedAt: now,
  },

  // ───────────── DONE (positions 0..3)
  {
    id: "t-301",
    title: "Typography system setup",
    description:
      "Integrated Editorial (headings) and Schibsted (body) with woff2 fallbacks, built responsive type scale via clamp, and added utility classes for code/secondary text.",
    assignee: "Emil",
    tags: ["type", "foundation"],
    status: "done",
    position: 0,
    createdAt: now - 1000 * 60 * 60 * 24 * 3,
    updatedAt: now - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "t-302",
    title: "Design tokens & theme variables",
    description:
      "Established CSS custom properties for core colors and exposed them as Tailwind tokens. Documented usage patterns for badges, buttons, and alert surfaces.",
    assignee: "Max",
    tags: ["design-system", "tokens"],
    status: "done",
    position: 1,
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    updatedAt: now - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "t-303",
    title: "Initial backlog view",
    description:
      "Shipped a simple backlog list with search and filters, linking through to task detail. Added empty states and basic sorting by recency.",
    assignee: "Ava",
    tags: ["routing", "ux"],
    status: "done",
    position: 2,
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    updatedAt: now - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "t-304",
    title: "Local persistence (Zustand)",
    description:
      "Enabled client-side persistence of tasks via Zustand with versioned storage. Added a reset path for demo data to support testing and reviews.",
    assignee: "Max",
    tags: ["state", "infra"],
    status: "done",
    position: 3,
    createdAt: now - 1000 * 60 * 60 * 24 * 1,
    updatedAt: now - 1000 * 60 * 60 * 24 * 1,
  },
];
