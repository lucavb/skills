---
name: review-tribunal
description: >-
  Review tribunal for pull requests, sets of related PRs, or local Git diffs: intake,
  review-core blind critics (including alternatives), tribunal, adversarial
  validation, then local reporting or interactive GitHub posting. Requires
  review-core. Use when reviewing a PR or several related PRs together, comparing a
  base branch with the current branch, reviewing a commit range or working tree, or
  spawning a review tribunal.
---

# Review tribunal

A **tribunal** always follows the same process: intake → **review-core** (blind → tribunal → adversarial) → delivery. The target selects the intake and delivery mechanics.

**Requires [review-core](../review-core/SKILL.md)** installed as a sibling skill.

When implementing from a ticket, use [ticket-to-pr-pipeline](../ticket-to-pr-pipeline/SKILL.md) Phases 3–4 with `mode: implement`.

## Steps

### 1. Select target and resolve diff

Select one target before calling target-specific tools:

- `github-pr` — the user supplied one or more PR URLs/numbers or explicitly requested GitHub review. Several PRs form a review set: [PR-SET.md](PR-SET.md).
- `local-diff` — the user supplied a Git range, named a base and current branch, requested branch/commit/working-tree review, or invoked tribunal without a PR.

If both targets are explicit, ask which one to review.

For `github-pr`, fetch metadata, files, commits, existing reviews, and head SHA with `gh`; select the source so repository reads match the pinned diff per [PR-SOURCE.md](PR-SOURCE.md). A review set runs this per PR.

For `local-diff`, follow [LOCAL-DIFF.md](LOCAL-DIFF.md). Its source manifest is the single source of truth for the reviewed range and working-tree scope.

**Completion criterion:** exactly one target is selected; each PR (or the local diff) has a non-empty diff and its own source manifest recording the exact diff source, head SHA, changed files, and included working-tree state (`NONE` for a PR); each GitHub source is verified at its pin.

### 2. Gather intel

1. Fetch ticket/AC from Jira when identified, or use pasted AC.
2. Pull linked tickets and epic context when they change blast radius or ownership.
3. Ask for sibling-repo paths when the AC spans FE/libs.
4. Skim entrypoint routing, sibling implementations, and prior art on the base — facts only, not author intent.
5. When the target has commits, include commit SHAs in the source manifest.
6. If PR/ticket metadata references an upstream/downstream PR, shared event/API/schema, or dependency snapshot, read the linked contract and at least one consumer before making a semantic or compatibility finding; do not substitute ticket shorthand or PR rationale for the contract.

A review set gathers this once for all items ([PR-SET.md](PR-SET.md#shared-context)).

**Completion criterion:** ticket/AC (or explicitly N/A), sibling paths (or N/A), linked sources inspected (or N/A with reason), and a factual intel brief are ready for critic prompts.

### 3–5. Review core (`mode: review`)

Run [review-core](../review-core/SKILL.md) Steps 1–3 with **`mode: review`**.

Inputs to pass (per item for a review set — [review-core/REVIEW-SET.md](../review-core/REVIEW-SET.md)):
- Ticket + AC + linked tickets
- Source manifest + diff
- Intel brief from Step 2
- Sibling repo paths (local Read preferred)

**Alternatives critic is required** — reviews must surface cleaner, simpler, or more consistent implementations, not just bugs. **Hygiene critic** when manifest lists commits — [review-core/COMMIT-HYGIENE.md](../review-core/COMMIT-HYGIENE.md). See [review-core/BLIND-REVIEW.md](../review-core/BLIND-REVIEW.md) and [review-core/ALTERNATIVES.md](../review-core/ALTERNATIVES.md).

Publish scorecards to the user after tribunal and adversarial validation. Delivery begins only after the revised scorecard.

**Completion criterion:** revised scorecard with adversarial verdicts on all Holds.

### 6. Deliver findings

For `local-diff`, deliver the revised scorecard using [LOCAL-DIFF.md's local report](LOCAL-DIFF.md#local-report).

For `github-pr`, walk remaining Holds and intentional Defer notes with the user using [GITHUB-REVIEW.md](GITHUB-REVIEW.md). That file is the single source of truth for pending reviews, post/continue, and submission. A review set delivers per PR ([PR-SET.md](PR-SET.md#delivery)).

**Completion criterion:** local target — final evidence-linked report and audit trail delivered; GitHub target — each PR's pending review submitted or explicitly discarded, with posted/skipped summary per PR.

### 7. Release sources

For `github-pr`, release every source this review created per [PR-SOURCE.md](PR-SOURCE.md#release). `local-diff` has nothing to release.

**Completion criterion:** every created worktree and stash is removed, restored, or reported with its path or SHA (`local-diff`: N/A).

## Checklist

```
- [ ] Target selected; exact diff source recorded
- [ ] Ticket/AC + sibling paths + intel brief
- [ ] review-core: blind critics (≥2 lenses; alternatives required; hygiene run or skip noted)
- [ ] review-core: first tribunal scorecard
- [ ] review-core: adversarial validation + revised scorecard
- [ ] Target-specific delivery complete
- [ ] GitHub sources released (or local-diff: N/A)
```
