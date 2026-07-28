# Tribunal — challenge every finding

The **tribunal** is where you act as judge, not advocate. Every critic recommendation earns a verdict before anything is posted or fixed.

## Verdicts

| Verdict | Meaning | Action (PR review context) |
|---------|---------|------------------------------|
| **Holds up** | Real defect, AC gap, or proportionate improvement | Candidate for a PR comment (and fix if you own the branch) |
| **Reject** | Wrong, misattributed entrypoint, out of scope, or cure worse than disease | Do not post as a defect; note in scorecard only |
| **Defer** | Valid follow-up, not this PR's job | Optional non-blocking comment or separate ticket |

## Challenge questions

Verify with **Read** / **Grep** / **Glob** before ruling.

1. **Reproducible?** Does the cited scenario actually exist on this entrypoint?
2. **Introduced?** Did this PR cause it, or was it already true on the base branch?
3. **In scope?** Does fixing it serve the ticket AC?
4. **Cost?** Does the suggested fix re-break the feature or invent scope?
5. **Evidence?** Diff cite, or pattern speculation?
6. **Wrong door?** Did the critic blame the wrong URL/API/FE path? (Classic overturn: anonymous redirect vs farm email CTA.)
7. **Alternative?** If "do X instead" — is X genuinely superior for this ticket, or elegance-only?

## Common Reject patterns

- Finding assumes an entrypoint the product never uses (e.g. onboarding redirect for farm collaborator emails).
- "Always call the other branch's guard" when the new branch must allow a documented upgrade edge case.
- Pre-existing platform behavior unrelated to the diff, framed as a regression.
- Reviewer reviewed the wrong files.

## Common Hold patterns

- False branch of a new compound condition has zero tests.
- AC names two org types; tests only exercise one.
- Shared helper reused here truncates behavior the AC requires (even if pre-existing).

## After first tribunal

Publish the scorecard to the user. Then run **adversarial** validation on Holds before posting — see [ADVERSARIAL.md](ADVERSARIAL.md).

**Completion criterion:** user can audit finding → verdict → why.
