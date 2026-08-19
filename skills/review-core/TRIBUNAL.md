# Tribunal — challenge every finding

The **tribunal** is where you act as judge, not advocate. Every critic recommendation earns a verdict before anything is delivered or fixed.

Parents set **mode** before running the tribunal:

- `implement` — Holds become code changes + re-run tests (ticket-to-pr Phase 4)
- `review` — Holds become review findings after adversarial validation (review-tribunal)

## Verdicts

| Verdict | Meaning |
|---------|---------|
| **Holds up** | Real defect, AC gap, or proportionate improvement |
| **Reject** | Wrong, misattributed entrypoint, out of scope, or cure worse than disease |
| **Defer** | Valid follow-up, not this change's or ticket's job |

## Actions by mode

| Verdict | `implement` (ticket-to-pr) | `review` (review-tribunal) |
|---------|---------------------------|---------------------------|
| Holds up | Fix + test on branch | Adversarial candidate → parent delivery |
| Reject | No code; note in implementation summary if useful | Scorecard audit trail |
| Defer | Follow-up ticket; keep implementation scope | Optional non-blocking finding |

## Challenge questions

Verify with **Read** / **Grep** / **Glob** before ruling — not shell `find`/`rg`/`grep`.

1. **Reproducible?** Does the cited scenario actually exist on this entrypoint?
2. **Introduced?** Did this change cause it, or was it already true on the base branch?
3. **In scope?** Does fixing it serve the ticket AC, or a general refactor?
4. **Cost?** Does the suggested fix re-break the feature, fail regression tests, or invent scope?
5. **Evidence?** Diff cite, or pattern speculation?
6. **Wrong door?** Did the critic blame the wrong URL/API/FE path? (Classic overturn: anonymous redirect vs farm email CTA.)
7. **Alternative?** If "do X instead" — does X win on the bar in [ALTERNATIVES.md](ALTERNATIVES.md), or is it scope creep / elegance-only?
8. **Better alternative?** Apply the review-time bar in [ALTERNATIVES.md](ALTERNATIVES.md); reject elegance-only proposals.
9. **Hygiene** Holds/Rejects: [COMMIT-HYGIENE.md](COMMIT-HYGIENE.md). Challenge: fixable before merge (split, restage, amend, rewrite message)?

## Common Reject patterns

- Finding assumes an entrypoint the product never uses (e.g. onboarding redirect for farm collaborator emails).
- "Always call the other branch's guard" when the new branch must allow a documented upgrade edge case.
- Pre-existing platform behavior unrelated to the diff, framed as a regression.
- Reviewer reviewed the wrong files.
- "Unify with sibling flow" when sibling uses different entry preconditions (e.g. always has `totalFields` on open) → **Reject** or narrow fix unless parity is ticket AC.

## Common Defer patterns

- "Extract shared helper" on a focused bugfix → **Defer** unless duplication caused the bug.
- "Add e2e" when unit tests already guard the regression and no e2e harness exists → **Defer** unless ticket demands e2e.

## Common Hold patterns

- False branch of a new compound condition has zero tests.
- AC names two org types; tests only exercise one.
- Shared helper reused here truncates behavior the AC requires (even if pre-existing).
- Negative test missing for the false branch of a compound condition.
- Test passes with a strictly weaker wrong implementation → add tripwire test.

## After first tribunal

Publish the scorecard to the user (finding → verdict → why). Then run **adversarial** validation on Holds — see [ADVERSARIAL.md](ADVERSARIAL.md).

### After adversarial (`implement` mode)

1. Implement **Holds up** items in one focused follow-up commit (prefer new commit on branch).
2. Re-run the same test targets plus any new tests added.
3. Summarize for the user: what critics said, what you accepted/rejected/deferred, and why.

### After adversarial (`review` mode)

Return the revised scorecard to [review-tribunal](../review-tribunal/SKILL.md) for target-specific delivery.

**Completion criterion:** every material finding has a traceable verdict and rationale; `implement` mode also records the action taken.
