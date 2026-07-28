---
name: review-core
description: >-
  Shared adversarial review engine: blind parallel critics (including alternatives),
  tribunal adjudication, and adversarial re-validation. Used by review-tribunal and
  ticket-to-pr-pipeline. Use directly when blind-reviewing a local branch mid-work.
---

# Review core

The shared review engine: **blind** critics → **tribunal** → **adversarial** validation. Predictability over improvisation.

Usually invoked by a parent skill — not run standalone unless the user asks to blind-review a branch.

**Requires sibling install** of this skill when using [review-tribunal](../review-tribunal/SKILL.md) or [ticket-to-pr-pipeline](../ticket-to-pr-pipeline/SKILL.md).

## Mode

Parents must set **mode** before running:

| Mode | Parent | Outcome for Holds |
|------|--------|-------------------|
| `review` | review-tribunal Steps 2–4 | PR-comment candidates → interactive post/continue |
| `implement` | ticket-to-pr-pipeline Phases 3–4 | Code fixes + re-run tests on branch |

## Code exploration

All phases and subagents follow [EXPLORATION.md](EXPLORATION.md). Paste those rules into every critic and validator prompt.

## Step 1 — Blind critics

Spawn parallel **blind** judges — ticket + diff + intel facts only; no implementer rationale.

Details: [BLIND-REVIEW.md](BLIND-REVIEW.md).

- Pick distinct lenses from the roster; floor ≥2 independent critics.
- **Alternatives critic is required** for `mode: review`; default for `mode: implement` unless diff is trivial (note skip on scorecard).
- Paste [EXPLORATION.md](EXPLORATION.md) rules into every subagent prompt.

**Completion criterion:** ≥2 independent reviews returned; wrong-diff reviews discarded; skipped roster lenses noted with reason.

## Step 2 — First tribunal

You are the judge, not the author's advocate. For every material finding: **Holds up** / **Reject** / **Defer**.

Details: [TRIBUNAL.md](TRIBUNAL.md). Alternative proposals: [ALTERNATIVES.md](ALTERNATIVES.md).

Verify claims with **Read** / **Grep** / **Glob** before ruling.

Publish a scorecard to the user (finding → verdict → why). Do **not** post to GitHub yet (`review` mode) or change code yet (`implement` mode).

**Completion criterion:** every material finding has an explicit verdict; user can see the audit trail.

## Step 3 — Adversarial validation

Spawn a **second** wave whose job is to **disprove or downgrade** the **Holds up** items — not rubber-stamp them.

Details: [ADVERSARIAL.md](ADVERSARIAL.md).

Feed validators: the finding, first-tribunal rationale, ticket/AC, sibling-repo paths, and any Atlassian/FE evidence already gathered.

Re-adjudicate after validators return. Overturn freely when evidence wins.

**Completion criterion:** each prior Hold has a CONFIRMED / DOWNGRADE / REJECT / UPGRADE verdict with evidence; revised scorecard published.

## After review-core

| Mode | Next step |
|------|-----------|
| `review` | review-tribunal Step 5 — interactive GitHub review |
| `implement` | Implement Holds, re-run tests, summarize audit trail |

## Checklist

```
- [ ] Blind critics (≥2 distinct lenses; alternatives unless trivial skip noted)
- [ ] First tribunal scorecard
- [ ] Adversarial validation + revised scorecard
- [ ] Parent handoff (GitHub review or implement fixes)
```
