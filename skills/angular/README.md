# angular

## Problem

Generic Angular guidance misses project conventions — `.subscribe()` in components, snapshot route reads, imperative form hydration, Bootstrap classes, and page CSS in global `styles.scss`.

## What it does

Zoneless Angular 22 conventions:

- **signals** + `toSignal` (no component `.subscribe()`)
- **shell** pattern for create/edit routes (shell + form child + util)
- **pipeline** rule for route- and query-driven loads
- Encapsulated SCSS via the workspace escalation ladder
- Shared UI library components, ISO date models, locale strings

## When to install

Install when working in an Angular repo whose `AGENTS.md` documents this stack.

```bash
npx skills add lucavb/skills --skill angular
```

## Branches

| Task | Start in |
|------|----------|
| Create/edit form page | `SHELL.md` |
| Query param load, pagination, submit-only | `RECIPES.md` |
| SCSS or layout | `STYLES.md` + workspace `AGENTS.md` |
| Migrating legacy code | `ANTI-PATTERNS.md` |

## Prerequisites

- Workspace **`AGENTS.md`** with stack facts, shared UI library name, and style escalation ladder
- Angular 22, zoneless change detection
