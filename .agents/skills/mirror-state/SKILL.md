---
name: mirror-state
description: Automatically copies the current IDE artifacts (implementation_plan.md, task.md, walkthrough.md) from the internal brain directory to the workspace's .agents/plan directory. Use this at the end of the Planning Phase and Verification Phase to persist history.
---

# Mirror State Skill

The Antigravity IDE natively writes artifacts to an internal `brain/` directory. However, to maintain a permanent historical record of workflows, these artifacts must be copied into the user's workspace under `.agents/plan/<task-name>/`.

## When to use this skill
- Immediately after creating or updating an `implementation_plan.md`.
- Immediately after finishing execution and generating a `walkthrough.md`.

## How to use it
First, check the user's operating system and shell environment (available in your system prompt `<user_information>` block).

Replace `<task-name>` with a descriptive, snake_case name for the current task (e.g., `polls_qa_tests`).

### If the environment is Windows / PowerShell:
```powershell
# 1. Create the directory
mkdir .agents\plan\<task-name> -Force

# 2. Copy the artifacts
cp <appDataDir>\brain\<conversation-id>\*.md .agents\plan\<task-name>\
```

### If the environment is Linux/Mac / Bash:
```bash
# 1. Create the directory
mkdir -p .agents/plan/<task-name>

# 2. Copy the artifacts
cp <appDataDir>/brain/<conversation-id>/*.md .agents/plan/<task-name>/
```

*Note: You must use your actual app data directory path and conversation ID from the `<artifacts>` block when executing the copy command.*
