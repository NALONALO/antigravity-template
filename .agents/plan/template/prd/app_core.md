# APP_CORE: [App Name]

> **AI Agent Instruction:** This is the foundational configuration document. These rules are global and non-negotiable. Read this file to establish the core architecture and coding standards before processing any feature-specific Product Requirements Documents (PRDs).

## 1. System Overview
*   **Purpose:** [One to two sentences describing what the app does]
*   **Primary Audience:** [Who uses this application]
*   **Deployment Environment:** [e.g., Vercel, AWS, Docker container]

## 2. Core Tech Stack
*   **Language:** [e.g., TypeScript v5+ — Strict mode enforced]
*   **Framework:** [e.g., Next.js 14 — App Router]
*   **Database:** [e.g., PostgreSQL]
*   **ORM/Query Builder:** [e.g., Prisma / Drizzle]
*   **Styling:** [e.g., Tailwind CSS / shadcn/ui]

## 3. Architectural Patterns
*   **Directory Structure:** 
    *   `[e.g., /app]:` [Core routing and page layout]
    *   `[e.g., /components]:` [Reusable UI elements]
    *   `[e.g., /lib]:` [Utility functions and shared logic]
    *   `[e.g., /types]:` [Global interface definitions]
*   **State Management:** [e.g., Zustand for global client state, URL search params for filtering]
*   **Data Fetching:** [e.g., Server Components for fetching, passing initial data to Client Components]

## 4. Coding Standards
*   **Typing:** No `any` types permitted. All external data payloads must be typed. Export shared interfaces from a central `types/` directory.
*   **Naming Conventions:** 
    *   Components & Interfaces: `PascalCase`
    *   Functions & Variables: `camelCase`
    *   Constants: `UPPER_SNAKE_CASE`
*   **Error Handling:** Wrap all external API and database calls in `try/catch` blocks. Return a standardized object: `{ data: any | null, error: string | null }`.
*   **Component Structure:** Favor small, modular functional components. Extract complex business logic into custom hooks or utility functions.

## 5. Security & Secrets
*   **Authentication Flow:** [e.g., NextAuth / JWT in HttpOnly cookies]
*   **Environment Variables:** Never hardcode secrets, API keys, or database URIs. Always reference variables via `process.env.[VARIABLE_NAME]`.
*   **Data Validation:** [e.g., Validate all incoming API request bodies using Zod before processing.]