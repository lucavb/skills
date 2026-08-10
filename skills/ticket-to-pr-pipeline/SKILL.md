---
name: ticket-to-pr-pipeline
description: >-
  ticket-to-pr-pipeline: Jira ticket through plan, build, review-core, and PR in
  one continuous run. Requires review-core. Use for a Jira ticket or bug when the
  user wants a merge-ready PR or invokes /ticket-to-pr-pipeline. Use when the
  user approves the plan or says implement, execute, or go ahead after intake.
---

# Ticket-to-PR pipeline

A **pipeline** runs the same **process** every ticket: intake → plan → build → **review-core** → ship.

**Requires [review-core](../review-core/SKILL.md).** **Continuity** rules: [CONTINUITY.md](CONTINUITY.md).

## When to run

Run all five phases with **continuity** when the user gives a ticket and expects a merge-ready PR.

Scope to named phases only when the user says so ("just plan", "build only", "review what we have", "stop before PR") — see [CONTINUITY.md](CONTINUITY.md).

## Phase 1 — Intake and plan

**Mode:** plan / read-only until the user approves.

1. Fetch the ticket (Jira MCP or pasted AC): summary, steps, expected vs actual, linked tickets.
2. Apply [discover-before-planning](../discover-before-planning/SKILL.md): do **legwork** in the codebase — find the flow, related tests, sibling implementations, prior tickets cited in AC. Use **Glob** → **Grep** → **Read** (see [review-core/EXPLORATION.md](../review-core/EXPLORATION.md)).
3. Reproduce or explain reproducibility from code + ticket steps. Say clearly if manual repro is still needed.
4. Survey **alternatives**: identify at least two viable implementation approaches (including "do nothing structural — patch locally"). For each: behaviour, scope, risk, consistency with sibling code, test cost. Name the recommended approach and why the others lose — see [PLAN-ALTERNATIVES.md](PLAN-ALTERNATIVES.md).
5. Produce a plan (`CreatePlan` in plan mode) that includes the alternatives comparison. Cite files and essential snippets. Note scope and non-goals.
6. Stop. Wait for user approval before editing.
7. Post the pipeline checklist (below); mark Phase 1 done.

**Completion criterion:** plan with ≥2 alternatives compared; user approved or waived planning; no product code edited yet; checklist posted.

## Phase 2 — Build

1. Implement the approved plan. Minimal diff; match repo conventions.
2. If **legwork** during build surfaces a clearly better alternative than the approved plan, stop and surface it to the user before continuing — see [PLAN-ALTERNATIVES.md](PLAN-ALTERNATIVES.md) Phase 2.
3. Add or extend tests that fail without the fix and pass with it.
4. Run targeted tests and fix failures.
5. Optional **regression proof:** stash only the fix (keep new tests), run tests — they should be **red** without the fix; restore stash.

**Completion criterion:** tests pass; regression proof done or skipped; **continuity** — Phase 3 begins in the same session.

## Phases 3–4 — Review core (`mode: implement`)

Run [review-core](../review-core/SKILL.md) Steps 1–3 with **`mode: implement`**.

**Phase 3 inputs** (blind critics):
- Ticket text and AC (and linked tickets if relevant)
- Branch diff or changed files (`git diff origin/main...HEAD` or uncommitted diff)
- Pointers to sibling/reference implementations in the repo
- Instruction: be skeptical; severity-tag findings; assume the fix may be wrong

**Withhold from critics:** implementer rationale, plan-file reasoning, chosen-approach narrative — see [review-core/BLIND-REVIEW.md](../review-core/BLIND-REVIEW.md). Tribunal alternatives: [review-core/ALTERNATIVES.md](../review-core/ALTERNATIVES.md).

**Phase 4 actions** (after adversarial validation):
- Implement **Holds up** items on the branch
- Re-run tests after accepted changes
- Summarize audit trail: what critics said, what you accepted/rejected/deferred, and why

**Completion criterion:** every material finding has hold/reject/defer; accepted items implemented and tested; **continuity** — Phase 5 begins in the same session unless user scoped "stop before PR".

## Phase 5 — Ship

1. Branch from `main` (not an unrelated feature branch) unless the user specifies otherwise.
2. Stage **only** files for this ticket — exclude unrelated local changes (`package.json`, debug logs, etc.).
3. Commit using [writing-commit-messages](../writing-commit-messages/SKILL.md) style for this repo.
4. Push and open PR with `gh pr create` (summary, test plan). Return the PR URL.

**Completion criterion:** PR URL delivered; branch contains only intentional ticket changes.

## Pipeline checklist

Update after each phase. Pipeline-complete when Phase 5 is checked **or** the user scoped out remaining phases.

```
- [ ] Phase 1: Plan approved (alternatives compared; legwork via Glob/Grep/Read)
- [ ] Phase 2: Build + tests green (+ regression proof optional)
- [ ] Phase 3: review-core blind review (≥2 subagents, no implementer rationale)
- [ ] Phase 4: review-core tribunal + adversarial — findings resolved (incl. alternatives)
- [ ] Phase 5: Branch, commit, PR
```

## Related skills

- [discover-before-planning](../discover-before-planning/SKILL.md) — close answerable questions during Phase 1 planning
- [review-core](../review-core/SKILL.md) — required; blind review, tribunal, adversarial validation
- [writing-commit-messages](../writing-commit-messages/SKILL.md) — commit messages on ship
- [handoff](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md) — if delegating a single phase to another agent (`npx skills add mattpocock/skills --skill handoff`)
- [refining-jira-tickets](../refining-jira-tickets/SKILL.md) — if the ticket itself is not ready (before Phase 1)
- [review-tribunal](../review-tribunal/SKILL.md) — reviewing someone else's open PR (`mode: review`)
