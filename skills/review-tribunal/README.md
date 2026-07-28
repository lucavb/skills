# review-tribunal

## Problem

Ad-hoc PR reviews skip blind critics, tribunal, and adversarial validation. Findings get posted without challenge — wrong entrypoints, pre-existing bugs framed as regressions, elegance-only alternatives, and missed cleaner implementations slip through.

## What it does

Enforces a repeatable review pipeline: **intake + intel → review-core (blind critics including alternatives → tribunal → adversarial validation) → interactive GitHub review**. Critics see ticket + diff only; a tribunal challenges every finding before anything is posted; validators try to disprove the Holds.

## When to install

Install when you review open PRs (especially ones you did not build) and want adversarial review before posting comments — including "is there a cleaner way?" alternatives findings.

```bash
npx skills add lucavb/skills --skill review-core -g -y
npx skills add lucavb/skills --skill review-tribunal -g -y
```

## Prerequisites

- **review-core** (required sibling skill)
- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) for Jira ticket/AC intake
- `gh` CLI for pending PR review and comment posting
- Agents that support subagent/task spawning (Cursor, Claude Code)
