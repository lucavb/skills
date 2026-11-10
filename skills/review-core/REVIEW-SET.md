# Review set — engine rules

A **review set** is several PRs reviewed together; each member is an **item** with its own source manifest, keyed by its `Review item` (`{owner}/{repo}#{n}`). Intake and delivery: [review-tribunal/PR-SET.md](../review-tribunal/PR-SET.md). A single manifest is the degenerate set: nothing here changes it.

Sets run in `mode: review` only.

## Attribution

Every finding, row, and verdict carries an **item**. One heading, one rule set:

- A finding cites paths and lines inside its item's manifest source (`Repo` at `Head`).
- A cross-item issue attaches to the item where the fix or comment lands, listing related items. When both items need a comment, record one finding per item and link them.
- A finding with no item, or one citing code outside its item's manifest, is a wrong-diff review and is discarded.
- Findings keep a stable ID across critic, tribunal, validator, and delivery; the **ledger** is the per-item table of those IDs and their latest verdicts.

## Critic inputs

Pass every critic all manifests, each item's diff and changed files, and the shared context. The prompt skeleton's `{SOURCE_MANIFEST}` becomes the manifest list, each labelled with its `Review item`. Critics see the whole set so cross-item contracts stay visible, then tag findings by item. Each critic's output ends with `Items covered` and `Items clean` (covered items with no findings).

Coverage floor, **per item**: ≥2 critics with distinct lenses, an alternatives critic, and a hygiene critic when that item's manifest lists commits (otherwise a noted skip). One critic may span items; coverage counts per item. Hygiene tables are keyed by item and SHA.

**Completion criterion:** every item is covered by the floor above; wrong-diff reviews are discarded per item.

## Scorecards

Both scorecards reproduce every manifest and group rows by item. An item with no findings still appears, with the critics that covered it. Each row: ID, item, severity, verdict, why.

## Validator inputs

Give each validator its finding, its item's manifest, the related items' manifests as read-only context, the first-tribunal rationale, and the shared context. A verdict that cites a different item than its finding is invalid and re-run.

**Completion criterion:** every Hold in every item has a validator verdict; the ledger's counts per item and verdict reconcile with the revised scorecard.
