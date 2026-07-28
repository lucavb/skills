---
name: ticket-to-pr-pipeline
description: >-
  End-to-end Jira ticket flow: intake and plan (with alternatives compared),
  user-approved build, blind review via parallel subagents, tribunal on critic
  findings, then branch, commit, and PR. Use when the user gives a Jira ticket
  or bug to fix and wants the full pipeline, adversarial review before ship, or
  "plan → build → review → PR".
---

# Ticket-to-PR pipeline

A **pipeline** runs the same **process** every ticket: intake → plan → build → **blind review** → **tribunal** → ship. Predictability over improvisation.

## Code exploration (tools)

**Use Read, Glob, and the Grep tool for almost all exploration.** This applies to every phase — intake legwork, build-time discovery, tribunal verification, and any subagent you spawn.

| Goal | Tool |
|------|------|
| Find files by path or name | **Glob** |
| Search file contents | **Grep** |
| Open a file you already know | **Read** |

**Reserve Shell for things builtins cannot do** — running tests, `git`, `gh`, installs, builds. **Not** for routine `find`, `rg`, or `grep`.

Only fall back to shell search when you need flags or paths the builtin tools cannot handle (e.g. `--no-ignore`, outside the workspace).

**Do not** default to `find .`, `rg`, or `grep` in the terminal when Glob/Grep/Read will do. If you reach for Shell for discovery, stop and use the builtins first.

## When to run the full pipeline

Run all phases when the user gives a ticket (Jira URL/key or pasted AC) and expects a merged-ready PR.

Skip or shorten only when the user names a phase explicitly ("just plan", "only review the branch", "commit and PR what we have").

## Phase 1 — Intake and plan

**Mode:** plan / read-only until the user approves.

1. Fetch the ticket (Jira MCP or pasted AC): summary, steps, expected vs actual, linked tickets.
2. Do **legwork** in the codebase: find the flow, related tests, sibling implementations, prior tickets cited in AC. Use **Glob** → **Grep** → **Read** (see [Code exploration](#code-exploration-tools)); no shell `find`/`rg`/`grep` for routine discovery.
3. Reproduce or explain reproducibility from code + ticket steps. Say clearly if manual repro is still needed.
4. Survey **alternatives**: identify at least two viable implementation approaches (including "do nothing structural — patch locally"). For each: behaviour, scope, risk, consistency with sibling code, test cost. Name the recommended approach and why the others lose — see [ALTERNATIVES.md](ALTERNATIVES.md).
5. Produce a plan (`CreatePlan` in plan mode) that includes the alternatives comparison. Cite files and essential snippets. Note scope and non-goals.
6. Stop. Wait for user approval before editing.

**Completion criterion:** plan exists with an explicit **alternatives** section (≥2 options compared), user has approved it (or explicitly waived planning), and you have not modified product code yet.

## Phase 2 — Build

1. Implement the approved plan. Minimal diff; match repo conventions.
2. If **legwork** during build surfaces a clearly better alternative than the approved plan, stop and surface it to the user before continuing — do not silently stick with a weaker approach. Explore with **Glob** / **Grep** / **Read**, not shell search.
3. Add or extend tests that fail without the fix and pass with it.
4. Run targeted tests and fix failures.
5. Optional **regression proof:** stash only the fix (keep new tests), run tests — they should be **red** without the fix; restore stash.

**Completion criterion:** tests pass with the fix; regression proof done or explicitly skipped by the user.

## Phase 3 — Blind review

Spawn parallel subagents tasked only as **critical judges**. They must not see your implementation rationale.

**Subagent tool usage:** In every subagent prompt (review, explore, bugbot, or delegated build), paste the [Code exploration](#code-exploration-tools) rules verbatim. Receivers must use **Glob** (find files), **Grep** (search contents), and **Read** (open known files) for almost all discovery — Shell only for tests, `git`, `gh`, installs; shell `find`/`rg`/`grep` only when builtins cannot (e.g. `--no-ignore`, paths outside the workspace).

**Give each reviewer:**
- Ticket text and AC (and linked tickets if relevant)
- Branch diff or changed files (`git diff origin/main...HEAD` or uncommitted diff)
- Pointers to sibling/reference implementations in the repo
- Instruction: be skeptical; severity-tag findings; do not assume the fix is correct

**Do not give:**
- Why you chose this approach
- Your root-cause narrative
- Rebuttals or "expected tradeoffs" from the implementer

Use distinct review angles (e.g. code defects, test adequacy, UX/behavior, cross-flow consistency, **better alternatives**). Details: [BLIND-REVIEW.md](BLIND-REVIEW.md).

**Completion criterion:** at least two independent reviews returned; obviously wrong or off-scope findings noted for tribunal.

## Phase 4 — Tribunal

You **challenge** every critic recommendation before acting. Verify claims with **Glob** / **Grep** / **Read** — not shell search.

For each finding, decide:
- **Holds up** — real defect, gap, or proportionate improvement → implement or add to PR.
- **Reject** — wrong, pre-existing, out of scope, or fixes one bug by introducing another → document why in the PR reply or commit message body if needed.
- **Defer** — valid but scope creep (e.g. shared helper extraction) → note as follow-up; do not block the ticket.

When a finding proposes a **better alternative** to the chosen implementation, apply the tribunal bar in [ALTERNATIVES.md](ALTERNATIVES.md) — swap only if it is genuinely superior for this ticket, not merely "more elegant".

Re-run tests after accepted changes.

**Completion criterion:** every material finding has an explicit hold/reject/defer; accepted items are implemented and tested.

## Phase 5 — Ship

1. Branch from `main` (not an unrelated feature branch) unless the user specifies otherwise.
2. Stage **only** files for this ticket — exclude unrelated local changes (`package.json`, debug logs, etc.).
3. Commit using [writing-commit-messages](../writing-commit-messages/SKILL.md) style for this repo.
4. Push and open PR with `gh pr create` (summary, test plan). Return the PR URL.

**Completion criterion:** PR URL delivered; branch contains only intentional ticket changes.

## Pipeline checklist

Copy and track:

```
- [ ] Phase 1: Plan approved (alternatives compared; legwork via Glob/Grep/Read)
- [ ] Phase 2: Build + tests green (+ regression proof optional)
- [ ] Phase 3: Blind review (≥2 subagents, no implementer rationale; exploration rules in prompts)
- [ ] Phase 4: Tribunal — findings resolved (incl. alternative proposals)
- [ ] Phase 5: Branch, commit, PR
```

## Related skills

- [writing-commit-messages](../writing-commit-messages/SKILL.md) — commit messages on ship
- [writing-agent-handoffs](../writing-agent-handoffs/SKILL.md) — if delegating a single phase to another agent
- [refining-jira-tickets](../refining-jira-tickets/SKILL.md) — if the ticket itself is not ready (before Phase 1)
- [review-tribunal](../review-tribunal/SKILL.md) — reviewing an open PR you did not just build (blind → tribunal → adversarial → post/continue)
