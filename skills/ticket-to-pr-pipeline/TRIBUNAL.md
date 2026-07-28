# Tribunal — challenging critic judgments

The **tribunal** is where the implementing agent acts as judge, not advocate. Every recommendation earns a verdict before code changes.

## Verdict types

| Verdict | Meaning | Action |
|---------|---------|--------|
| **Holds up** | Valid for this ticket; fix or test now | Implement + test |
| **Reject** | Incorrect, pre-existing, out of scope, or cure worse than disease | No code change; note in PR comment if reviewer will see the PR |
| **Defer** | Valid follow-up, not this ticket | Issue/comment only; do not expand PR scope |

## Challenge questions (use on each finding)

Verify with **Glob** / **Grep** / **Read** before ruling — not shell `find`/`rg`/`grep`.

1. **Reproducible?** Does the critic point to a scenario the ticket or code actually allows?
2. **Introduced?** Did this PR introduce it, or was it already true on `main`?
3. **In scope?** Does fixing it serve the ticket AC, or a general refactor?
4. **Cost?** Does the suggested fix risk re-breaking the original bug or failing new regression tests?
5. **Evidence?** Did the critic cite the diff, or speculate from patterns?
6. **Alternative?** If the finding is "do X instead" — does X win on the bar in [ALTERNATIVES.md](ALTERNATIVES.md), or is it scope creep / elegance-only?

## Common reject patterns

- "Extract shared helper" on a focused bugfix → **Defer** unless duplication caused the bug.
- "Add e2e" when unit tests already guard the regression and no e2e harness exists → **Defer** unless ticket demands e2e.
- "Unify with sibling flow" when sibling uses different entry preconditions (e.g. always has `totalFields` on open) → **Reject** or narrow fix unless parity is ticket AC.
- Reviewer reviewed wrong files → **Reject** entire review output for those items.

## Common hold patterns

- Negative test missing for the false branch of a compound condition → **Holds up**
- Same loaded-page vs `totalFields` bug on a related button in the same hook → **Holds up** (same root signal)
- Test passes with a strictly weaker wrong implementation → **Holds up** — add tripwire test

## After tribunal

1. Implement **Holds up** items in one focused follow-up commit or amend the branch (prefer new commit on PR branch).
2. Re-run the same test targets plus any new tests added.
3. Summarize for the user: what critics said, what you accepted/rejected/deferred, and why — without relitigating the original design essay.

**Completion criterion:** user can see a clear audit trail from finding → verdict → action.
