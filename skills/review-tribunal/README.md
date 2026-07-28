# review-tribunal

## Problem

Ad-hoc PR reviews skip blind critics, tribunal, and adversarial validation. Findings get posted without challenge — wrong entrypoints, pre-existing bugs framed as regressions, and elegance-only alternatives slip through.

## What it does

Enforces a repeatable review pipeline: **intake + intel → blind parallel critics → first tribunal → adversarial re-validation → interactive GitHub review**. Critics see ticket + diff only; a tribunal challenges every finding before anything is posted; validators try to disprove the Holds.

## When to install

Install when you review open PRs (especially ones you did not build) and want adversarial review before posting comments.

```bash
npx skills add lucavb/skills --skill review-tribunal
```

## Prerequisites

- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) for Jira ticket/AC intake
- `gh` CLI for pending PR review and comment posting
- Agents that support subagent/task spawning (Cursor, Claude Code)
