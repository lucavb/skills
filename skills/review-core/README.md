# review-core

## Problem

Blind review, tribunal, and adversarial validation were duplicated across `review-tribunal` and `ticket-to-pr-pipeline` — same process, forked docs, drifting rules.

## What it does

Shared adversarial review engine: **blind parallel critics** (including a required alternatives lens for PR review) → **tribunal** (Hold / Reject / Defer) → **adversarial re-validation**.

Not usually installed alone. Parent skills set `mode`:

- `review` — findings become PR-comment candidates (via review-tribunal)
- `implement` — findings become code fixes on the branch (via ticket-to-pr-pipeline)

## When to install

Install as a **dependency** of review-tribunal or ticket-to-pr-pipeline:

```bash
npx skills add lucavb/skills --skill review-core -g -y
npx skills add lucavb/skills --skill review-tribunal -g -y
# or
npx skills add lucavb/skills --skill ticket-to-pr-pipeline -g -y
```

## Prerequisites

- Agents that support subagent/task spawning (Cursor, Claude Code)
- Parent skill provides ticket/AC context and diff source
