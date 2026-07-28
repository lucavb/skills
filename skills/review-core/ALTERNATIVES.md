# Alternatives — review-time bar

When a blind critic or tribunal evaluates "do X instead" on a PR or branch, apply this bar. The goal is surfacing genuinely cleaner, simpler, or more consistent implementations — not elegance for its own sake.

Survey sibling implementations with **Glob** / **Grep** / **Read** — not shell search.

For **pre-build** alternatives comparison (before code is written), see [ticket-to-pr-pipeline/PLAN-ALTERNATIVES.md](../ticket-to-pr-pipeline/PLAN-ALTERNATIVES.md).

## When to run

- **Blind review:** dedicated Alternatives lens (required for `mode: review`; default for `mode: implement` unless diff is trivial).
- **Tribunal:** when any finding proposes a different approach to the one in the diff.

## Review-time bar

A critic's **alternative** earns a swap only if **all** hold:

1. Fixes the ticket AC, including edge cases the current diff still mishandles.
2. Not materially wider scope than the ticket (refactors need their own ticket unless the bug is caused by the duplication).
3. Does not reintroduce the original bug or fail existing/new regression tests.
4. Better on at least one of: correctness, maintainability, consistency with siblings — not merely shorter or "more pure".

## Tribunal mapping

| Outcome | Verdict | `implement` action | `review` action |
|---------|---------|-------------------|-----------------|
| Meets the bar | **Holds up** | Fix on branch + re-run tests | PR comment (blocker if correctness gap; major if meaningful simplification) |
| Valid but wider scope | **Defer** | Follow-up ticket; do not expand PR | Optional non-blocking PR note |
| Theoretically nicer, same behaviour / untested edge | **Reject** | No code change; note why if useful | Scorecard only; do not post |

## Anti-patterns

- Listing one real option and a strawman ("refactor entire module") to justify the obvious pick.
- Choosing structural unification without checking sibling preconditions (e.g. different loading flags, entry context).
- Ignoring a sibling implementation that already solved the same bug class.
- Elegance-only proposals with no correctness or consistency gain.
