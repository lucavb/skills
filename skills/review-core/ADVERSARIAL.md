# Adversarial validation

After the first tribunal, independently validate **every Holds up item** with a validator whose job is to **disprove or downgrade** it. Rubber-stamping is failure. Within a review snapshot, preserve the verified source manifest and all source-pin checks unchanged; validators must assess the same pinned source as the tribunal. On a head change, follow the new-snapshot procedure in [SKILL.md](SKILL.md#code-exploration).

## Evidence record

Every finding verdict carries one compact evidence record, from the first tribunal through adversarial re-adjudication. The tribunal establishes it; the validator challenges it and adds or corrects evidence; the final verdict retains the challenged record. Keep observations separate from inference and mark unknowns explicitly:

```text
Trigger / scope: {conditions that trigger the finding; affected versions and comparison baseline(s), or unknown}
Observed: {direct source/runtime observations and checks; commands/results and relevant environment, or none}
Inference: {how the observations support or weaken the finding}
Unverified: {remaining assumptions, gaps, and limitations, or none}
```

Use concise evidence specific to the finding. The source manifest pins repository and head; cite that pin rather than restating or changing it. Record the tested environment for runtime checks (for example OS, runtime/dependency versions, and relevant configuration). A verdict without all four fields is incomplete.

## Repeat validation

When validation is requested again, pass the tribunal evidence record and any prior validation records and verdicts as claims to challenge. Compare the head, evidence, and hypothesis with the prior validation. If the head changed, start a new review snapshot with a fresh, verified manifest for that head, rerun relevant checks, and re-adjudicate findings against the new source; independently adversarially validate every resulting Hold before relying on its verdict. No verdict carries forward from the old snapshot; never silently mutate or reuse its pin. If the head is unchanged but evidence or hypothesis changed, rerun relevant checks under the unchanged snapshot pin. If none changed, challenge the existing evidence, scope, and inference, and seek an alternative explanation instead of repeating equivalent tests. Record changes and new checks in the evidence record.

## Prompt stance

```
You are an ADVERSARIAL validator. Try to DISPROVE or DOWNGRADE this tribunal finding.
Challenge both the change and the tribunal; confirmation requires evidence.

Finding: {ID} — {SEVERITY} — {TITLE}
Tribunal rationale: {SUMMARY}
Tribunal evidence record: {RECORD}
Prior validation record (repeat validation only): {RECORD_OR_NONE}

Repo: {PATH} @ {HEAD_REF_OR_SHA}; preserve the exact source-manifest pin
Source manifest:
{SOURCE_MANIFEST}
Sibling repos (local): {PATHS}
Ticket / AC excerpts: {…}
Extra context (Jira links, FE wiring, email URL routing, prior tickets): {…}

Tasks:
1. Re-read the cited code and the real user journey (email CTA → FE → API).
2. Check whether the finding misattributes the wrong entrypoint.
3. Check pre-existing vs introduced; AC owner (BE vs FE).
4. Verdict: CONFIRMED / DOWNGRADE (new severity) / REJECT / UPGRADE (if defer was too soft).
5. Return the verdict with the four-field evidence record above, explicitly challenging the tribunal record and, on repeat validation, the prior validation record; state whether head, evidence, or hypothesis changed and which checks were rerun (or why equivalent checks were not repeated).
6. Recommended action (review finding for review mode; code fix for implement mode).
```

## What to feed them

- The finding + first-tribunal why
- Ticket AC and linked tickets (e.g. email-bind sibling)
- Local sibling checkouts for FE toast/routing
- Production URL routing (email processor → path params)
- Existing automated review comments (useful as claims to verify)
- Enough **intel** to re-judge correctness (real entrypoint, FE vs BE ownership, pre-existing vs introduced)

Validators may spawn extra digs or sub-searches; prefer disproof over confirmation.

Hygiene disproof patterns: [COMMIT-HYGIENE.md](COMMIT-HYGIENE.md#adversarial-disproof).

Review set: validator inputs per [REVIEW-SET.md](REVIEW-SET.md#validator-inputs).

## Re-adjudicate

| Validator says | You do |
|----------------|--------|
| REJECT | Drop from delivered findings / fix list (scorecard keeps the overturn) |
| DOWNGRADE | Retain only when still worth a non-blocking finding or minor fix |
| CONFIRMED | Remains a delivery candidate (`review`) or fix candidate (`implement`) |
| UPGRADE | Promote a Defer to Hold if evidence warrants |

**Completion criterion:** revised scorecard; every prior Hold has an adversarial verdict.
