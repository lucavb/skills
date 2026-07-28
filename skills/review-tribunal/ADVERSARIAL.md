# Adversarial validation

After the first tribunal, spawn validators whose job is to **disprove or downgrade** each **Holds up** item. Rubber-stamping is failure.

## Prompt stance

```
You are an ADVERSARIAL validator. Try to DISPROVE or DOWNGRADE this tribunal finding.
Do not rubber-stamp. Be skeptical of both the PR and the tribunal.

Finding: {ID} — {SEVERITY} — {TITLE}
Tribunal rationale: {SUMMARY}

Repo: {PATH} (PR branch)
Sibling repos (local): {PATHS}
Ticket / AC excerpts: {…}
Extra context (Jira links, FE wiring, email URL routing, prior tickets): {…}

Tasks:
1. Re-read the cited code and the real user journey (email CTA → FE → API).
2. Check whether the finding misattributes the wrong entrypoint.
3. Check pre-existing vs introduced; AC owner (BE vs FE).
4. Verdict: CONFIRMED / DOWNGRADE (new severity) / REJECT / UPGRADE (if defer was too soft)
5. Evidence + recommended PR action.
```

## What to feed them

- The finding + first-tribunal why
- Ticket AC and linked tickets (e.g. email-bind sibling)
- Local sibling checkouts for FE toast/routing
- Production URL routing (email processor → path params)
- Existing PR bot comments (often wrong — useful as counter-examples)
- Enough **intel** to re-judge correctness (real entrypoint, FE vs BE ownership, pre-existing vs introduced)

Validators may spawn extra digs or sub-searches; prefer disproof over confirmation.

## Re-adjudicate

| Validator says | You do |
|----------------|--------|
| REJECT | Drop from PR comments (scorecard keeps the overturn) |
| DOWNGRADE | Keep only if still worth a non-blocking note |
| CONFIRMED | Remains a post candidate |
| UPGRADE | Promote a Defer to Hold if evidence warrants |

**Completion criterion:** revised scorecard; every prior Hold has an adversarial verdict.
