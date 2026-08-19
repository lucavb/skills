# review-core

## Problem

Blind review, tribunal, and adversarial validation were duplicated across `review-tribunal` and `ticket-to-pr-pipeline` — same process, forked docs, drifting rules.

## What it does

Shared adversarial review engine: **blind parallel critics** (including a required alternatives lens for review mode) → **tribunal** (Hold / Reject / Defer) → **adversarial re-validation**.

Not usually installed alone. Parent skills set `mode`:

- `review` — findings return to review-tribunal for local reporting or GitHub delivery
- `implement` — findings become code fixes on the branch (via ticket-to-pr-pipeline)

## When to install

Install directly for a blind local review, or as a **dependency** of review-tribunal or ticket-to-pr-pipeline:

```bash
npx skills add lucavb/skills --skill review-core -g -y
npx skills add lucavb/skills --skill review-tribunal -g -y
# or
npx skills add lucavb/skills --skill ticket-to-pr-pipeline -g -y
```

## Prerequisites

- Agents that support subagent/task spawning (Cursor, Claude Code)
- Caller provides ticket/AC context (or N/A) and an exact diff source manifest
