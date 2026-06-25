# Antigravity Workspace Template

Welcome to the **Antigravity Workspace Template**. This template is designed to help you bootstrap new projects pre-configured with Antigravity features like custom rules, workflows, and skills.

---

## 🚀 Key Features

*   **Project Bootstrapping**: Kickstart projects with ready-to-use Antigravity configurations.
*   **Local Subagent Support**: Built-in support for running local subagents using [headless-pi](https://github.com/NALONALO/headless-pi) alongside the [pi](https://github.com/earendil-works/pi) coding agent.
*   **Agent Protocols**: Structured workflow definitions and safety boundaries established in [AGENTS.md](AGENTS.md).

---

## 📂 Workspace Architecture

### 1. Agent Rules & Guidelines ([AGENTS.md](AGENTS.md))
This file outlines the core protocols the AI assistant must adhere to:
*   **Core Parallel Protocol**: Rules for strict state isolation, worker role assignments, and deterministic merging to safely execute parallel tasks.
*   **Local LLM Guidelines**: Constraints and wrappers for delegating work to local models via [headless-pi](https://github.com/NALONALO/headless-pi).
*   **Workflow Guidelines**: Rules on workflow auto-routing, state-mirroring, and mandatory approval checkpoints.

### 2. Workspace Skills (`.agents/skills/`)
Custom workflow skills placed here are automatically discovered and loaded by the Antigravity agent. These files define the step-by-step lifecycle for specialized domains, including:
*   **Data Science & Machine Learning**: Model training, EDA, and data recon.
*   **Debugging & Troubleshooting**: Reproducing errors, trace analysis, and isolation strategies.
*   **Performance Tuning**: Load testing, stress testing, and SLA metrics validation.
*   **General & Fallback**: Light action plans and safety guardrails for ad-hoc, state-modifying tasks.
*   **Mirror State**: Automates persisting agent planning artifacts (`implementation_plan.md`, `task.md`, `walkthrough.md`) to the workspace's `.agents/plan/` directory.

---

## 🛠️ How to Extend & Customize

You can tailor the AI coding assistant's behaviors specifically for your project:

### Adding or Customizing Rules
Update or append new instructions to the [AGENTS.md](AGENTS.md) file. The agent will read this at the beginning of each session to align with your guidelines.

### Adding New Skills
To add a new skill to the workspace:
1. Create a new directory under `.agents/skills/<skill_name>/`.
2. Inside that directory, create a `SKILL.md` file containing YAML frontmatter defining its `name` and `description` (e.g., see the [workflow_creator_template](.agents/skills/workflow_creator_template/SKILL.md) for a baseline layout).
3. Optional: Add subdirectories like `scripts/`, `examples/`, `references/`, or `resources/` for supporting assets.

---

## 📄 License

This template is licensed under the MIT License. See [LICENSE](LICENSE) for details.