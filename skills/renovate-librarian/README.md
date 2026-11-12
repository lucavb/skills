# renovate-librarian

## Problem

Renovate dashboards list dozens of open proposals across grouped PRs, rate limits, pending checks, and major migrations. Agents cherry-pick the easy row, batch-verify once, or apply updates without tracing consumer impact—then report success when only part of the queue was understood or tested.

## What it does

Works through a repository's Renovate queue end to end:

- **Inventory** — read the dashboard and open Renovate PRs; keep a ledger of applied, actionable, excluded, superseded, and blocked items with reasons
- **Research and apply** — inspect diffs, release notes, and consumer repos; align manifests and lockfiles; keep each update independently reviewable
- **Verify each update** — run required quality and test commands per update, not once per batch; record evidence and blockers in the ledger
- **Close out** — combined validation, final diff review, and a report of what landed versus what remains

Respects Renovate policy (no rebase of edited branches without authorization), user exclusions, and repository commit conventions.

## When to install

Install when you want an agent to maintain or clear a Renovate dependency queue with per-update verification and explicit accounting for everything on the dashboard.

```bash
npx skills add lucavb/skills --skill renovate-librarian
```

## Prerequisites

- GitHub MCP or another authorized read-only GitHub interface (open Renovate PRs, dashboard, commits); GitHub CLI (`gh`) is a common fallback.
- The repository's package manager and documented install, build, and test commands.
- Optional: [writing-commit-messages](../writing-commit-messages/README.md) when the repo expects a commit-message workflow before each commit.
