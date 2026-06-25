---
name: debugging_workflow
description: Use this skill when troubleshooting complex issues, analyzing logs, or finding the root cause of a specific system failure.
---

# Debugging & Troubleshooting Workflow

This workflow defines the step-by-step lifecycle for isolating bugs, setting up debugging environments, and resolving application errors.

## Phase -1: Context Gathering & Reproduction
Before blindly changing code, the Master Agent MUST understand the failure mode and the business intent.
1. **Triage (Expected vs Actual)**: Determine what the code is *supposed* to do (Business Logic) versus what it is *actually* doing (The Bug).
2. **Reproduction Steps**: How do we trigger this bug? (e.g., API request, clicking a button, providing a failing JSON payload).
3. **PRD Cross-Reference**: If the feature was built using the SDLC workflow, review the `prd.md` to understand the Acceptance Criteria.
4. **Interactive Grilling**: If documentation is missing or the "Expected" behavior is unclear, the Agent MUST use the `/grill-me` command to interview the user and walk through the business logic together *before* debugging.
5. **IDE Context**: Ask the user if they want to debug via Terminal (e.g., `pdb`) or via their IDE (e.g., configuring `.vscode/launch.json`).

## Phase 0: Discovery (Trace Analysis)
Conduct read-only discovery to pinpoint the source of the issue.
1. Read the stack trace provided by the user or run a command to generate one.
2. Search the codebase for the failing function or file.
3. Review related recent commits or PRs if applicable.
4. Save the findings to an `.agents/plan/<task-name>/trace_analysis.md` artifact.

## Phase 1: The Debugging Plan
- Enter **Planning Mode**.
- Create an `implementation_plan.md` detailing how to isolate and fix the bug.
- Create a `task.md` to track the isolation steps.
- **Save State**: Automatically execute the `mirror-state` skill to copy these artifacts into the workspace.

Your `implementation_plan.md` MUST include:
1. **Hypothesis**: What do we think is causing the bug?
2. **Isolation Strategy**: How will we prove it? 
   - *Option A*: Inject `breakpoint()` or `import pdb; pdb.set_trace()` into the code for the agent to debug via terminal.
   - *Option B*: Configure `.vscode/launch.json` so the user can visually debug in their IDE.
   - *Option C*: Write an isolated Unit Test that fails identically to the bug.
3. **Proposed Fix**: (If the bug is already obvious).

## Phase 2: User Approval Checkpoint
- Present the `implementation_plan.md` to the user.
- **CRITICAL**: Do not inject debuggers, modify application logic, or rewrite `launch.json` without explicit user sign-off.

## Phase 3: Execution & Isolation
- Execute the approved isolation strategy.
- If using Terminal Debugging (`pdb`), use the `run_command` tool interactively (using `send_input` to step through the code, watch variables, and print state).
- If the root cause is found, implement the fix.

## Phase 4: Verification & Knowledge Sync
- Verify the bug is resolved by running the reproducible test case from Phase -1.
- **Knowledge Sync**: Ensure a regression test is written and committed so this bug never happens again.
- Generate a `walkthrough.md` documenting the root cause and fix, then append `_completed` to the plan directory.
