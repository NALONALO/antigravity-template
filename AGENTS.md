## Core Parallel Protocol

This protocol defines the strict interfaces and rules that MUST be followed whenever a workflow spawns multiple subagents to execute tasks in parallel. 

> [!IMPORTANT]
> **Interface vs Implementation**: This file defines *that* subagents must be isolated. It does NOT define *how*. The specific mechanism of isolation (e.g., git worktrees, container namespaces, data cloning) must be defined and implemented by the specific Domain Workflow invoking this protocol.

### Rule 1: Strict Scope Isolation
Subagents MUST NEVER mutate the exact same target or state simultaneously to prevent race conditions.
- The Master Agent must provision a completely isolated scope for each subagent. This can be a physical state clone (e.g., git worktrees) OR a partitioned target list (e.g., assigning distinct servers or distinct data chunks).
- Subagents must be explicitly instructed to ONLY modify their assigned scope or targets.

### Rule 2: Worker Role Assignment in Planning
To prevent prompt bloat and context truncation during complex delegations:
- The Master Agent MUST explicitly assign a Worker ID to each parallel task inside the `implementation_plan.md` during the Planning Phase (e.g., `[MODIFY] utils.py (Assigned to: Worker-A)`).
- During the Execution Phase, the Master Agent's delegation strategy depends on the worker type:
  - **For Autonomous Subagents** (e.g., `headless-pi` terminal agents): The Master Agent MUST pass ONLY the absolute file path to the `implementation_plan.md` via the CLI (e.g., `headless-pi -p "Read plan at <path>. You are Worker-A. Execute ONLY tasks assigned to Worker-A."`).
  - **For Stateless Local LLMs** (e.g., `headless-pi` without tools): The Master Agent MUST manually read the file and inject the text content into the prompt.

### Rule 3: Deterministic Output & Syncing
Subagents do not have the authority to merge their own work into the master state.
- Upon completion, each subagent must report back to the Master Agent with a deterministic payload (e.g., a specific file path to their output, a test result, or an isolated commit hash).

### Rule 4: Conflict Resolution & Merging
The Master Agent is solely responsible for merging the parallel outputs back into the global state.
- If conflicts arise during the merge phase, the Master Agent must either resolve them sequentially or pause and present the conflict to the User for approval.

### Rule 5: Master Agent Dependency Management
Subagents do NOT natively understand dependencies between each other. The Master Agent is completely responsible for orchestration.
- **Sequential Dependencies**: If Task B strictly depends on Task A (e.g., DNS must exist before running a `curl` test), they MUST NOT be scheduled in parallel.
- **Synchronized Parallelism**: The Master Agent may spawn parallel subagents for independent tasks (e.g., Deploying K3s and Adding a DNS record), but MUST wait for both subagents to report successful completion before triggering any dependent verification steps.

### Rule 6: Clean Teardown
Once the Master Agent has merged the outputs and verified the new global state, it MUST destroy all isolated environments (e.g., deleting temporary databases, unmounting worktrees, or destroying containers) to prevent disk bloat and stale states.

### Rule 7: Collision Detection & Abort Protocol
If a subagent discovers an unmapped dependency or a scope collision that the Master Agent missed during planning:
1. The subagent MUST immediately halt execution and alert the Master Agent.
2. The Master Agent MUST confirm the collision, immediately halt all other parallel subagents, and execute the **Rollback Scenario** defined in the `implementation_plan.md`.
3. The Master Agent MUST inform the User of the collision and propose a rewritten plan.

---

## Local LLM Guidelines

Define the strict behavioral constraints and system interactions for the Master Agent when delegating work to the local LLM (`MiniMax-M2.7`) via `headless-pi` terminal subagents.

1. **Strict Delegation**: The master agent **must not** write, modify, or draft project code directly. All code modifications must be delegated to a Local LLM worker.
2. **Context Injection vs Autonomous Reading**: 
    - When delegating to stateless tasks without file access, the Master Agent MUST inject the required context (plan, file contents) directly into the prompt.
    - When delegating to autonomous subagents via terminal, the Master Agent MUST simply pass the absolute path of the `implementation_plan.md` and let the subagent read it natively.
3. **No Token Ceiling Override**: The master agent must keep task sizes small so the local LLM completes them naturally without truncation.
4. **Autonomous Execution MUST use `headless-pi`**: For tasks requiring multi-step file modifications, CLI commands, and autonomous ReAct loops, the Master Agent MUST delegate to `headless-pi` via terminal (`run_command`), NOT `pi`. 
   - *Why?* Natively, `pi -p` suppresses realtime logs. `headless-pi` is a globally installed NPM wrapper that dynamically injects a custom streaming extension, printing all `[THINKING]`, `[MESSAGE]`, and `[TOOL]` outputs to `stderr`. 
   - *How?* Launch background tasks via `headless-pi -p "Execute the plan..."`. You will receive live streaming updates in the task log, allowing you to maintain full observability over the subagent's execution state without ever being blocked by a black box.

---

## Core Workflow Guidelines

1. **Workflow Routing**: Whenever you receive a new task, you MUST rely on your native skill evaluation to route the task to the correct Domain Skill (e.g., SDLC, Ops, QA).
2. **Agent Delegation & Fallback**: Always attempt to delegate implementation tasks to the Local LLM first. If the Local LLM is unavailable or fails, you may fallback to executing via the Cloud Agent. You MUST follow the Local LLM Guidelines regarding execution.
3. **Parallel Execution**: When executing tasks in parallel across multiple subagents, you must use domain-appropriate state isolation to prevent race conditions as defined by the **Core Parallel Protocol** (above).
4. **Artifact Synchronization**: System-generated artifacts (`implementation_plan.md`, `task.md`, `walkthrough.md`) must be immediately mirrored and saved to the project directory `.agents/plan/<task-name>/`.
5. **Strict Approval Checkpoint**: NEVER execute tasks, edit project files, or spin up environments before the user has explicitly reviewed and approved the Implementation Plan. You must wait for a clear "go ahead" signal from the user.
