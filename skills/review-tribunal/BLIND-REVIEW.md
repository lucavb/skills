# Blind critics — roster and prompt shape

Reviewers are **blind**: ticket + diff only — no implementer rationale.

The table below is a **roster**, not a mandatory checklist. It shows what is *possible* and usually *worth covering*. Pick the lenses that fit the PR; skip what is clearly irrelevant; **spawn more** when a thread needs depth. Divert from the roster when you have a **good reason** (state it briefly in the scorecard).

**Alternatives** is high priority whenever the PR invents a branch, abstraction, or new side effect — not an optional flourish.

## Roster

| Lens | Focus |
|------|--------|
| **Security** | AuthZ bypass, IDOR, token/identity binding, privilege escalation, blast-radius changes, multi-tenant ambiguity |
| **Code quality** | Clarity, types, error handling, transactions, nesting, naming that will rot, dead paths |
| **Bug introduction** | Regressions vs base, false branches of new conditions, races, soft-delete / restore asymmetry, silent data inconsistency |
| **Consistency** | Sibling flows, divergent predicates for the same concept, missing events/permissions siblings have |
| **Testing** | Coverage vs AC, mocks that fake success, untested false branches, e2e that never hits the new path |
| **Alternatives** | Simpler or more principled designs; align-with-sibling options; what to swap now vs defer — not elegance for its own sake |
| **AC / behavior** | Ticket AC vs code; FE-only clauses; wrong-entrypoint risk |

Specialized subagents (`security-review`, `bugbot`, explore-heavy consistency) are fine when they sharpen a lens — still **blind**, still severity-tagged.

**Minimum:** ≥2 independent critics with **distinct** lenses. On a non-trivial PR, prefer enough lenses that security, bugs/regressions, tests, consistency, and **alternatives** are not all missing without reason.

## Intel (before and during)

Gather enough context to judge correctness — critics and the parent agent both dig:

- Ticket AC, comments, linked tickets, epic scope (FE vs BE ownership)
- Email/URL routing, FE consumers, glossary/error wiring (ask for sibling repo paths; prefer local **Read**)
- Sibling implementations in-repo the PR should match or consciously diverge from
- Prior art on `main` (is this pre-existing?)

Pass useful intel **into** critic prompts as facts (paths, AC text, linked keys) — not as “the author meant X.”

## Prompt skeleton

```
You are an independent critical reviewer. Your role: {ROLE}.

Repo: {FULL_REPO_PATH}
Diff: {DIFF_SOURCE}  (e.g. origin/main...HEAD on branch X, commit SHA)
Ticket: {KEY} — {SUMMARY}
{PASTE DESCRIPTION / AC / LINKED TICKETS}

Changed files: {LIST}

Reference files for comparison (read in repo; do not assume parity is required):
- {SIBLING_OR_REFERENCE_PATHS}

Sibling checkouts (if provided — prefer local Read/Grep over gh api for source):
- {LOCAL_SIBLING_PATHS}

Intel already gathered (facts only, not author intent):
- {ROUTING / FE / LINKED TICKETS / PRIOR ART}

Focus your critique on: {FOCUS}

Rules:
- Code exploration: use Read, Glob, and the Grep tool for almost all discovery.
  - Glob — find files by path/name
  - Grep — search contents
  - Read — open files you already know
  - Shell — only for tests, git, gh, installs; NOT routine find/rg/grep
  - Shell search fallback — only when builtins cannot (e.g. --no-ignore, outside the workspace)
- Gather more intel if needed to judge correctness (sibling flows, FE entrypoints, ticket links).
- Do not assume the implementer's approach is correct.
- Severity-tag every finding: blocker / major / minor / nit.
- Cite file paths and line regions where possible.
- If the change looks sound, say so briefly — still list residual risks.
- Judge only observable behavior and code.
```

For the **Alternatives** lens, also require: for each proposal — current approach, alternative, why superior *for this ticket*, swap-now vs defer, residual risk of keeping current.

## Omit from every prompt

- Root-cause narrative from the implementing agent
- "We chose X because Y"
- Anticipated rebuttals or accepted tradeoffs
- Plan-file reasoning

## Aggregate

1. Deduplicate overlapping findings.
2. Discard reviews of the wrong diff / unrelated files.
3. Note which roster lenses were skipped and why (one line is enough).
4. Pass the merged list to the tribunal **without** defending the implementation.
