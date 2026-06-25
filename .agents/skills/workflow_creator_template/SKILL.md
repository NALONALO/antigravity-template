---
name: workflow_creator_template
description: Use this skill as a baseline template when you need to create a brand new, specialized workflow skill from scratch.
---

> [!CAUTION]
> **DO NOT USE THIS WORKFLOW FOR TASK EXECUTION.**
> This is a skeleton template meant ONLY for creating *new* specialized workflows (e.g., Data Science, Marketing, Security). If you are trying to execute a user's task, you must route to a specific, finalized workflow via the Triage Router.

# [Domain Name] Workflow

This workflow defines the step-by-step lifecycle for [Domain Description] tasks.

## Phase -1: Context Gathering & Triage
Before beginning work, the Master Agent MUST interview the user to establish context.
1. **Triage**: What is the specific goal of this task?
2. **Context Extraction**: Where are the existing documents or assets related to this task?
3. **Knowledge Structure**: Determine where the outputs and documentation for this task should be permanently stored.

## Phase 0: Discovery
Conduct necessary read-only discovery to understand the current state of the workspace or environment.
1. [Domain specific discovery step 1]
2. [Domain specific discovery step 2]

## Phase 1: Implementation Planning
- Enter **Planning Mode**.
- Create an `implementation_plan.md` to define the exact steps to be taken based on Phase -1 and Phase 0.
- Create a `task.md` to translate the Plan into a granular checklist.
- **Save State**: Automatically execute the `mirror-state` skill to copy these artifacts into the workspace.

Your `implementation_plan.md` MUST include:
1. **Objective**: What is the goal?
2. **Resource Mapping (CRITICAL)**: Explicitly map all isolated scopes, target domains, and shared dependencies to prevent state collisions if execution is parallelized.
3. **Execution Steps**: Granular breakdown of actions.
4. **Risks/Impact**: Any potential negative impacts (e.g., downtime, data loss).
5. **Rollback Scenario**: How to revert if execution fails.

## Phase 2: User Approval Checkpoint
- Present the `implementation_plan.md` to the user.
- **CRITICAL**: DO NOT execute modifying actions without explicit user sign-off on the plan and rollback strategy.

## Phase 3: Execution & Delegation
- Execute the approved steps.
- If parallel execution or subagents are required, adhere to `.agents/workflows/core-parallel-protocol.md`.

## Phase 4: Verification & Knowledge Sync
- Verify the task was completed successfully.
- **Knowledge Sync**: Ensure all new knowledge, scripts, or assets are migrated to the permanent storage location agreed upon in Phase -1.
- Generate a `walkthrough.md` documenting the resolution and append `_completed` to the plan directory.
