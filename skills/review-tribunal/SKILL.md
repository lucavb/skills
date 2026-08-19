---
name: review-tribunal
description: >-
  Review tribunal for pull requests or local Git diffs: intake, review-core blind
  critics (including alternatives), tribunal, adversarial validation, then local
  reporting or interactive GitHub posting. Requires review-core. Use when reviewing
  a PR, comparing a base branch with the current branch, reviewing a commit range or
  working tree, or spawning a review tribunal.
---

# Review tribunal

A **tribunal** always follows the same process: intake → **review-core** (blind → tribunal → adversarial) → delivery. The target selects the intake and delivery mechanics.

**Requires [review-core](../review-core/SKILL.md)** installed as a sibling skill.

When implementing from a ticket, use [ticket-to-pr-pipeline](../ticket-to-pr-pipeline/SKILL.md) Phases 3–4 with `mode: implement`.

## Steps

### 1. Select target and resolve diff

Select one target before calling target-specific tools:

- `github-pr` — the user supplied a PR URL/number or explicitly requested GitHub review.
- `local-diff` — the user supplied a Git range, named a base and current branch, requested branch/commit/working-tree review, or invoked tribunal without a PR.

If both targets are explicit, ask which one to review.

For `github-pr`, fetch metadata, files, commits, existing reviews, and head SHA with `gh`; check out or fetch the PR branch so repository reads match the diff.

For `local-diff`, follow [LOCAL-DIFF.md](LOCAL-DIFF.md). Its source manifest is the single source of truth for the reviewed range and working-tree scope.

**Completion criterion:** exactly one target is selected; its diff is non-empty; the source manifest records the exact diff source, head SHA, changed files, and included working-tree state.

### 2. Gather intel

1. Fetch ticket/AC from Jira when identified, or use pasted AC.
2. Pull linked tickets and epic context when they change blast radius or ownership.
3. Ask for sibling-repo paths when the AC spans FE/libs.
4. Skim entrypoint routing, sibling implementations, and prior art on the base — facts only, not author intent.
5. When the target has commits, include commit SHAs in the source manifest.

**Completion criterion:** ticket/AC (or explicitly N/A), sibling paths (or N/A), and a factual intel brief are ready for critic prompts.

### 3–5. Review core (`mode: review`)

Run [review-core](../review-core/SKILL.md) Steps 1–3 with **`mode: review`**.

Inputs to pass:
- Ticket + AC + linked tickets
- Source manifest + diff
- Intel brief from Step 2
- Sibling repo paths (local Read preferred)

**Alternatives critic is required** — reviews must surface cleaner, simpler, or more consistent implementations, not just bugs. **Hygiene critic** when manifest lists commits — [review-core/COMMIT-HYGIENE.md](../review-core/COMMIT-HYGIENE.md). See [review-core/BLIND-REVIEW.md](../review-core/BLIND-REVIEW.md) and [review-core/ALTERNATIVES.md](../review-core/ALTERNATIVES.md).

Publish scorecards to the user after tribunal and adversarial validation. Delivery begins only after the revised scorecard.

**Completion criterion:** revised scorecard with adversarial verdicts on all Holds.

### 6. Deliver findings

For `local-diff`, deliver the revised scorecard using [LOCAL-DIFF.md's local report](LOCAL-DIFF.md#local-report).

For `github-pr`, walk remaining Holds and intentional Defer notes with the user using [GITHUB-REVIEW.md](GITHUB-REVIEW.md). That file is the single source of truth for pending reviews, post/continue, and submission.

**Completion criterion:** local target — final evidence-linked report and audit trail delivered; GitHub target — pending review submitted or explicitly discarded, with posted/skipped summary.

## Checklist

```
- [ ] Target selected; exact diff source recorded
- [ ] Ticket/AC + sibling paths + intel brief
- [ ] review-core: blind critics (≥2 lenses; alternatives required; hygiene run or skip noted)
- [ ] review-core: first tribunal scorecard
- [ ] review-core: adversarial validation + revised scorecard
- [ ] Target-specific delivery complete
```
