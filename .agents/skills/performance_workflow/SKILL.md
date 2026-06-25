---
name: performance_workflow
description: Use this skill for load testing, stress testing, or performance tuning and optimization.
---

# Performance Workflow

This workflow defines the lifecycle for conducting Load, Stress, and Performance tuning. Performance testing simulates high traffic and inherently carries the risk of overwhelming infrastructure or incurring high cloud compute costs.

## Phase -1: Context Gathering & Triage
Before generating any load, the Master Agent MUST interview the user to establish boundaries.
1. **Triage**: What is the scope? (e.g., Baseline Load Test, Maximum Stress Test, Spike Testing, Endpoint Benchmarking).
2. **Target Safety**: EXACTLY what environment are we targeting? *WARNING: Load testing against Production can cause a self-inflicted Denial of Service (DoS) outage.*
3. **Metric Definitions**: What are the acceptable SLAs? (e.g., "95th percentile response time must be under 200ms at 100 RPS").

## Phase 0: Discovery
Conduct necessary read-only discovery of the infrastructure and monitoring stack.
1. **Toolchain Audit**: Identify installed load generation tools (e.g., JMeter, Locust, k6, Apache Bench).
2. **Observability Verification**: Ensure we have access to server metrics (CPU, Memory, DB Connections) during the test. Running a load test without monitoring is flying blind.

## Phase 1: Performance Test Plan
- Enter **Planning Mode**.
- Create an `implementation_plan.md` to define the load scenario.
- **Save State**: Automatically execute the `mirror-state` skill to copy these artifacts into the workspace.

Your `implementation_plan.md` MUST include:
1. **Objective**: What bottlenecks are we trying to find?
2. **Load Profile**: Explicitly state the RPS (Requests Per Second), total concurrent users, and ramp-up time.
3. **Execution Steps**: The exact commands or test scripts to run.
4. **Abort Condition (CRITICAL)**: Under what specific conditions should the test be immediately aborted? (e.g., "If error rate exceeds 5% or DB CPU hits 95%").

## Phase 2: User Approval Checkpoint
- Present the `implementation_plan.md` to the user.
- **CRITICAL**: Highlight the Load Profile and Abort Conditions. Wait for explicit approval before launching any traffic generation tools.

## Phase 3: Execution & Monitoring
- Execute the approved load test scripts.
- The Master Agent MUST actively monitor the output or system metrics (if possible) during execution and trigger the Abort Condition if necessary.

## Phase 4: Analysis & Reporting
- Analyze the results against the defined SLAs from Phase -1.
- **Knowledge Sync**: Save the performance report and metrics graph to the designated documentation folder.
- Generate a `walkthrough.md` summarizing the bottlenecks discovered and recommended infrastructure/code tuning.

## Phase 5: Remediation Handoff
Do not attempt to implement complex performance tuning within this workflow. Once the final report is generated, you must present the findings to the user and **ask for their explicit confirmation** before transitioning to the appropriate workflow:
- For application code optimization, transition to `.agents/workflows/sdlc-workflow.md`.
- For deep bottleneck analysis or memory leaks, transition to `.agents/workflows/debugging-workflow.md`.
- For infrastructure scaling or DB tuning, transition to `.agents/workflows/ops-workflow.md`.
