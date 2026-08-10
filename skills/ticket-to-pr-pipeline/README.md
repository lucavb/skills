# ticket-to-pr-pipeline

## Problem

Ad-hoc ticket fixes skip structured review. Agents improvise each time — missing blind review, skipping adversarial validation, shipping regressions, or merging without comparing alternatives. The process varies per ticket instead of being predictable.

## What it does

Enforces a repeatable pipeline: **intake → plan (with alternatives) → user-approved build → review-core → branch, commit, PR**. After plan approval, **continuity** keeps phases 2–5 in one session — see [CONTINUITY.md](CONTINUITY.md).

## When to install

Install when you give agents Jira tickets or bugs and want the full flow — especially when you care about adversarial review before merge.

```bash
npx skills add lucavb/skills --skill review-core -g -y
npx skills add lucavb/skills --skill ticket-to-pr-pipeline -g -y
```

## Prerequisites

- **review-core** (required sibling skill)
- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) for Jira ticket intake
- `gh` CLI for pull request creation
- Agents that support subagent/task spawning (Cursor, Claude Code)
