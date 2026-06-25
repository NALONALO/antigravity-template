---
name: data_science_workflow
description: Use this skill for data analysis, machine learning modeling, data engineering, and data science tasks.
---

# Data Science & Machine Learning Workflow

This workflow defines the step-by-step lifecycle for data extraction, exploratory data analysis (EDA), and machine learning model training tasks.

## Phase -1: Context Gathering & Triage
Before beginning work, the Master Agent MUST interview the user to establish context.
1. **Triage**: What is the specific goal? (e.g., Predictive modeling, data cleaning, statistical analysis?)
2. **Context Extraction**: Where does the dataset live? (e.g., SQLite DB, external API, CSV files?)
3. **Knowledge Structure**: Determine where the Jupyter Notebooks and trained models should be stored permanently.

## Phase 0: Discovery (Data Recon)
Conduct necessary read-only discovery to understand the shape and quality of the data.
1. Connect to the data source and fetch the schema or column headers.
2. Identify missing values, data types, and potential class imbalances.
3. Save the findings into an `.agents/plan/<task-name>/data_recon.md` artifact.

## Phase 1: Implementation Planning (Experiment Plan)
- Enter **Planning Mode**.
- Create an `implementation_plan.md` to define the exact modeling approach.
- Create a `task.md` to translate the Plan into a granular checklist.
- **Save State**: Automatically execute the `mirror-state` skill to copy these artifacts into the workspace.

Your `implementation_plan.md` MUST include:
1. **Objective**: What metric are we optimizing for? (e.g., Accuracy, F1-Score, RMSE).
2. **Execution Steps**: Which algorithms will be tested? (e.g., Random Forest, XGBoost).
3. **Risks/Impact**: Could this model introduce bias? Is the dataset too large for local memory?
4. **Rollback/Safety**: Ensure the original raw dataset is treated as immutable and never modified directly.

## Phase 2: User Approval Checkpoint
- Present the `implementation_plan.md` and `data_recon.md` to the user.
- **CRITICAL**: DO NOT begin computationally expensive training loops without explicit user sign-off on the experiment plan.

## Phase 3: Execution & Delegation
- Execute the approved steps (e.g., writing the Jupyter Notebook or Python training script).
- If hyperparameter tuning can be parallelized across multiple subagents, adhere to `.agents/workflows/core-parallel-protocol.md`.
  - **Implementation**: For Data Science, the Master Agent MUST ask the user for their preferred isolation target method (e.g., test in a development server, create a new temporary table, or create a new logical DB) to prevent data loss. Production data MUST NEVER be mutated by parallel agents simultaneously.

## Phase 4: Verification & Knowledge Sync
- Verify the model meets the success metrics defined in the plan.
- **Knowledge Sync**: Ensure the final model weights and the analysis documentation are saved to the permanent storage location agreed upon in Phase -1.
- Generate a `walkthrough.md` documenting the model's performance metrics and append `_completed` to the plan directory.
