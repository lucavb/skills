# ticket-to-pr-pipeline

## Problem

Ad-hoc ticket fixes skip structured review. Agents improvise each time — missing blind review, shipping regressions, or merging without comparing alternatives. The process varies per ticket instead of being predictable.

## What it does

Enforces a repeatable pipeline: **intake → plan (with alternatives) → user-approved build → blind review via parallel subagents → tribunal on critic findings → branch, commit, PR**. Subagents review without seeing the implementation plan; a tribunal decides which findings to fix before ship.

## When to install

Install when you give agents Jira tickets or bugs and want the full flow — especially when you care about adversarial review before merge.

```bash
npx skills add lucavb/skills --skill ticket-to-pr-pipeline
```

## Prerequisites

- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) for Jira ticket intake
- `gh` CLI for pull request creation
- Agents that support subagent/task spawning (Cursor, Claude Code)
