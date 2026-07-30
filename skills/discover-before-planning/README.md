# discover-before-planning

## Problem

Agents defer discovery to execution ("we'll figure it out in Phase 2"), leaving open questions for the user or a later session.

## What it does

Walks every branch of the decision tree during planning; explores the codebase and read-only checks before presenting a plan; only escalates genuinely unresolvable questions.

## When to install

Install for plan mode, drafting implementation plans, or any workflow where the agent would otherwise punt verification to build time.

```bash
npx skills add lucavb/skills --skill discover-before-planning
```

## Prerequisites

None. Works with any agent that supports skills.
