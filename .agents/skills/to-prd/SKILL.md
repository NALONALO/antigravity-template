---
name: to-prd
description: Turn the current conversation into a PRD and publish it to the workspace and the project issue tracker — support both App Core and Feature-specific templates.
disable-model-invocation: true
---

This skill combines conversation context and codebase understanding to produce a clear, structured Product Requirements Document (PRD) that can be used by product, design, engineering, QA, and stakeholders. It supports two distinct templates depending on the scope of the requirements being defined:
1. **App Core (`app_core.md`)**: The foundational architecture, tech stack, and global coding rules.
2. **Feature PRD (`feature_prd.md`)**: The requirements for a specific module or feature, which must extend and adhere to the App Core.

## Operating Rules

1. **Determine Scope**:
   - **App Core**: Generate this when setting up a new repository, defining foundational tech stacks, establishing core architectural patterns, setting naming conventions/coding standards, or outlining global security patterns.
   - **Feature PRD**: Generate this when defining requirements for a specific module, feature, user flow, or functional component.

2. **Rules Inheritance**:
   - The App Core explicitly inherits and extends the global and workspace agent rules (e.g., `.agents/AGENTS.md`). It defines application-specific coding and architectural standards that sit on top of the agent collaboration protocols.
   - All Feature PRDs must adhere to the global architecture and standards defined in the `APP_CORE.md` file.

3. **Information Synthesis**:
   - Synthesize the current conversation context and codebase understanding to produce the PRD.
   - Do NOT interview the user unnecessarily. Synthesize what you already know.
   - If the user provides partial input or requirements are ambiguous, infer only what is safe, present a recommended interpretation, note alternatives briefly, and clearly label inferred items as **Assumptions**.
   - If extremely critical information is missing, ask only the most important clarifying questions first.
   - Do not invent facts.

4. **Style & Structure**:
   - Write in plain, specific language. Avoid vague statements.
   - Focus on what needs to be built, why it matters, how success will be measured, and what is explicitly out of scope.
   - Keep the PRD implementation-neutral unless technical constraints/decisions are given.

5. **Quality Standards**:
   - Each requirement must be testable or observable.
   - Use concise, numbered requirements.
   - Distinguish must-have from nice-to-have.
   - Include edge cases when they matter.
   - Ensure the document is internally consistent and complete.

## Process

1. **Explore the Repository**:
   - Understand the current state of the codebase.
   - Use the project's domain glossary vocabulary throughout the PRD.
   - Respect any Architecture Decision Records (ADRs) in the area you are touching.

2. **Design Testing Seams (for Feature PRDs)**:
   - Sketch out the seams at which you're going to test the feature.
   - Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can.
   - The fewer seams across the codebase, the better - the ideal number is one.
   - Check with the user that these seams match their expectations.

3. **Draft and Store the PRD**:
   - Format the output structure as:
     - **Summary**: A short summary of what you understood first.
     - **PRD Content**: Either the App Core or Feature PRD in clean markdown format (using the respective template below).
     - **Open Questions**: End with open questions, if any remain.
   - Save the finalized PRD file in the workspace:
     - For App Core: Store it at `.agents/plan/app_core.md`.
     - For Feature PRD: Store it at `.agents/plan/<task-name>/feature_prd.md`.
   - Publish the PRD to the project issue tracker. Apply the `ready-for-agent` triage label (no need for additional triage).

---

<app-core-template>

# APP_CORE: [App Name]

> **AI Agent Instruction:** This is the foundational configuration document. These rules are global and non-negotiable. This document inherits from and extends the workspace's agent rules (e.g., `.agents/AGENTS.md`). Read this file to establish the core architecture and coding standards before processing any feature-specific Product Requirements Documents (PRDs).

## 1. System Overview
*   **Purpose**: [One to two sentences describing what the app does, including background context, product problem, and desired business outcomes]
*   **Primary Audience**: [Who uses this application / Target Personas]
*   **Deployment Environment**: [e.g., Vercel, AWS, Docker container]

## 2. Core Tech Stack
*   **Language**: [e.g., TypeScript v5+ — Strict mode enforced]
*   **Framework**: [e.g., Next.js 14 — App Router]
*   **Database**: [e.g., PostgreSQL]
*   **ORM/Query Builder**: [e.g., Prisma / Drizzle]
*   **Styling**: [e.g., Tailwind CSS / shadcn/ui]

## 3. Architectural Patterns
*   **Directory Structure**: 
    *   `[e.g., /app]:` [Core routing and page layout]
    *   `[e.g., /components]:` [Reusable UI elements]
    *   `[e.g., /lib]:` [Utility functions and shared logic]
    *   `[e.g., /types]:` [Global interface definitions]
*   **State Management**: [e.g., Zustand for global client state, URL search params for filtering]
*   **Data Fetching**: [e.g., Server Components for fetching, passing initial data to Client Components]

## 4. Coding Standards
*   **Typing**: No `any` types permitted. All external data payloads must be typed. Export shared interfaces from a central `types/` directory.
*   **Naming Conventions**: 
    *   Components & Interfaces: `PascalCase`
    *   Functions & Variables: `camelCase`
    *   Constants: `UPPER_SNAKE_CASE`
*   **Error Handling**: Wrap all external API and database calls in `try/catch` blocks. Return a standardized object: `{ data: any | null, error: string | null }`.
*   **Component Structure**: Favor small, modular functional components. Extract complex business logic into custom hooks or utility functions.

## 5. Security & Secrets
*   **Authentication Flow**: [e.g., NextAuth / JWT in HttpOnly cookies]
*   **Environment Variables**: Never hardcode secrets, API keys, or database URIs. Always reference variables via `process.env.[VARIABLE_NAME]`.
*   **Data Validation**: [e.g., Validate all incoming API request bodies using Zod before processing.]

## 6. Constraints, Assumptions & Risks
*   **Constraints**: Operational, resource, or platform limits.
*   **Assumptions**: Underpinning assumptions about architecture or requirements.
*   **Risks**: Security, performance, or deployment risks.

</app-core-template>

---

<feature-prd-template>

# FEATURE PRD: [Feature Name]

> **AI Agent Instruction:** This is a module-specific feature specification. You must adhere to the global architecture and coding standards defined in the `APP_CORE.md` file while implementing this feature.

## 1. Feature Objective
*   **Goal**: [One or two sentences explaining what this feature does, target users, and desired business outcomes.]
*   **Success Criteria**: [What defines the feature as complete, e.g., "User can log in, receive a session token, and be redirected to the dashboard."]
*   **Goals & Non-Goals**:
    *   **Goals**: Clear goals for the feature.
    *   **Non-Goals / Out of Scope**: Explicitly what is out of scope.

## 2. User Flow & Stories
List the exact step-by-step interaction the user will have with this feature.
1. [e.g., User clicks 'Sign In' on the navigation bar.]
2. [e.g., A modal opens with 'Sign in with Google' and an email/password form.]

### User Stories
A LONG, numbered list of user stories. Each user story should be in the format of:
1. As an <actor>, I want a <feature>, so that <benefit>

*This list of user stories should be extremely extensive and cover all aspects of the feature.*

## 3. UI/UX Requirements
*   **Components Needed**: [e.g., `LoginForm`, `GoogleAuthButton`, `AuthModal`]
*   **State / Inputs**: [e.g., Email (string), Password (string), LoadingState (boolean)]
*   **Validation**: [e.g., Email must be a valid format, password minimum 8 characters.]

### Functional Requirements
- Concise, numbered functional requirements.
- Each requirement must be testable or observable.
- Distinguish must-have from nice-to-have.
- Include edge cases when they matter.

### Non-Functional Requirements
- Concise, numbered non-functional requirements (e.g., performance, accessibility, security, load limits).

## 4. Technical Requirements
Define the specific backend, database, and API logic required for this module.

### A. Data Schema Changes
*   **Model/Table**: `[Model Name]`
*   **New Fields**:
    *   `[fieldName]`: `[Type]` - `[Description/Constraint]`

### B. API Endpoints / Server Actions
*   **Route**: `[e.g., POST /api/auth/login]`
*   **Payload (Request)**: `[e.g., { email, password }]`
*   **Response (Success)**: `[e.g., { status: 200, user: UserObject }]`
*   **Response (Error)**: `[e.g., { status: 401, message: "Invalid credentials" }]`

### C. Testing Decisions & Seams
*   **Testing Seams**: Sketch the seams at which the feature will be tested (highest seam possible, prefer existing).
*   **Good Test Criteria**: Focus on testing external behavior, not implementation details.
*   **Modules & Prior Art**: Which modules will be tested and what are the similar existing tests.

## 5. Edge Cases & Error Handling
Explicitly state how the AI should handle anomalies.
*   [e.g., What happens if the user enters the wrong password 5 times?]
*   [e.g., What happens if the database is unreachable?]

## 6. Assumptions, Constraints & Dependencies
*   **Assumptions**: Clearly label any inferred items or assumptions.
*   **Constraints**: Feature-specific constraints.
*   **Dependencies**: Dependencies on other systems, components, or tasks.

## 7. Rollout & Acceptance Criteria
*   **Rollout / Launch Plan**: Proposed rollout phases.
*   **Acceptance Criteria**: Clear, testable criteria for completion.

</feature-prd-template>


