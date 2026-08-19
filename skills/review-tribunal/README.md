# review-tribunal

## Problem

Ad-hoc reviews skip blind critics, tribunal, and adversarial validation. Findings survive without challenge — wrong entrypoints, pre-existing bugs framed as regressions, elegance-only alternatives, and missed cleaner implementations slip through. The same rigor should work before a pull request exists.

## What it does

Enforces a repeatable review pipeline for an open PR or local Git diff: **targeted intake + intel → review-core (blind critics including alternatives → tribunal → adversarial validation) → delivery**. Local reviews end in an evidence-linked scorecard; PR reviews continue through interactive GitHub posting.

## When to install

Install when you want adversarial review of an open PR, `main...HEAD`, a commit range, or working-tree changes — including “is there a cleaner way?” alternatives findings.

```bash
npx skills add lucavb/skills --skill review-core \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y
npx skills add lucavb/skills --skill review-tribunal \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y
```

## Prerequisites

- **review-core** (required sibling skill)
- Agents that support subagent/task spawning (Cursor, Claude Code)
- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) when Jira ticket/AC intake is needed
- `gh` CLI only for GitHub PR intake and posting; local-diff reviews use Git
