# scrum-next

## Problem

The scrum board looks like a queue, but many items are blocked, in QA, already owned elsewhere, or not ready. Agents pick the top card without checking assignee, sprint, dependencies, or open PR review state.

## What it does

Triages the active sprint and open PRs with evidence from Jira and GitHub. Surfaces the user's own PRs when they need a response (feedback, checks, merge state). Recommends one actionable item—implementation, refinement, own-PR follow-up, or code review—with a link and the immediate first step. Respects work the user says is already in progress elsewhere.

## When to install

Install when you ask what to work on next, what is next on the board, or want a single actionable Jira task or PR review chosen for you.

```bash
npx skills add lucavb/skills --skill scrum-next
```

## Prerequisites

- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) for sprint and ticket evidence.
- GitHub CLI (`gh`) or GitHub MCP for open PR and review state.
