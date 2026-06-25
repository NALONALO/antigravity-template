---
name: general_workflow
description: Use this skill for ad-hoc, one-off, or trivial requests that do not fit into specific SDLC or Ops domains.
---

# General / Fallback Workflow

> [!NOTE]
> **Philosophy**: A specialized workflow is always the *Global Optimum*. However, when speed is required and a specialized workflow does not exist, this General Workflow serves as the safe *Local Optimum* to get work done quickly without sacrificing core safety principles.

This workflow is the catch-all fallback for ad-hoc, investigatory, or one-off tasks.

## Phase -1: The Triviality Check
Determine the scope of the user's request.
1. **Investigatory / Read-Only**: If the user is just asking a question (e.g., "Explain this code", "Find the IP address"), skip all formal planning. Read the necessary files and answer conversationally.
2. **State-Modifying**: If the task requires editing files, running destructive commands, or changing configurations, proceed to Phase 1.

## Phase 1: Lightweight Action Plan
- Enter **Planning Mode**.
- Create a brief `implementation_plan.md` artifact. Unlike specialized workflows, this does not require a massive PRD or exhaustive documentation.
- The plan MUST include:
  1. **What will be changed**.
  2. **How to revert it** (Rollback Scenario).

## Phase 2: Approval
- Present the `implementation_plan.md` to the user.
- **CRITICAL**: Do not execute modifying actions without explicit sign-off.

## Phase 3: Execution & Teardown
- Execute the approved steps.
- **The Extensibility Reminder**: If the user begins asking for this specific type of task repeatedly, the Master Agent should proactively suggest: *"We are using the General Workflow for this a lot. Should we use the `_workflow-template.md` to turn this into a specialized workflow (Global Optimum)?"*
