# Adversarial validation

After the first tribunal, spawn validators whose job is to **disprove or downgrade** each **Holds up** item. Rubber-stamping is failure.

## Prompt stance

```
You are an ADVERSARIAL validator. Try to DISPROVE or DOWNGRADE this tribunal finding.
Challenge both the change and the tribunal; confirmation requires evidence.

Finding: {ID} — {SEVERITY} — {TITLE}
Tribunal rationale: {SUMMARY}

Repo: {PATH} @ {HEAD_REF_OR_SHA}
Source manifest:
{SOURCE_MANIFEST}
Sibling repos (local): {PATHS}
Ticket / AC excerpts: {…}
Extra context (Jira links, FE wiring, email URL routing, prior tickets): {…}

Tasks:
1. Re-read the cited code and the real user journey (email CTA → FE → API).
2. Check whether the finding misattributes the wrong entrypoint.
3. Check pre-existing vs introduced; AC owner (BE vs FE).
4. Verdict: CONFIRMED / DOWNGRADE (new severity) / REJECT / UPGRADE (if defer was too soft)
5. Evidence + recommended action (review finding for review mode; code fix for implement mode).
```

## What to feed them

- The finding + first-tribunal why
- Ticket AC and linked tickets (e.g. email-bind sibling)
- Local sibling checkouts for FE toast/routing
- Production URL routing (email processor → path params)
- Existing automated review comments (useful as claims to verify)
- Enough **intel** to re-judge correctness (real entrypoint, FE vs BE ownership, pre-existing vs introduced)

Validators may spawn extra digs or sub-searches; prefer disproof over confirmation.

## Re-adjudicate

| Validator says | You do |
|----------------|--------|
| REJECT | Drop from delivered findings / fix list (scorecard keeps the overturn) |
| DOWNGRADE | Retain only when still worth a non-blocking finding or minor fix |
| CONFIRMED | Remains a delivery candidate (`review`) or fix candidate (`implement`) |
| UPGRADE | Promote a Defer to Hold if evidence warrants |

**Completion criterion:** revised scorecard; every prior Hold has an adversarial verdict.
