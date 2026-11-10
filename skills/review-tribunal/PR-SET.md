# Review set — GitHub PRs reviewed together

A **review set** is the PRs one review covers; each member is an **item**, keyed `{owner}/{repo}#{n}`. A single PR is the degenerate set and follows the ordinary steps in [SKILL.md](SKILL.md). Engine rules for critics, validators, and scorecards live in [review-core/REVIEW-SET.md](../review-core/REVIEW-SET.md).

## Membership

- **User-supplied PRs** — two or more PRs in the request form the set; review them together, across repositories if needed, without asking which one to choose.
- **Discovered PRs** — a PR surfaced by a ticket link, PR body, or contract trace joins only after the user approves. Ask once per PR, naming the PR, where it surfaced, and what it would add. Until approved it is read-only context (read with `gh`, no checkout): no manifest, and no finding or comment is attributed to it.
- **PR with a local diff** — the target choice in [SKILL.md](SKILL.md) Step 1 still applies.

**Completion criterion:** every PR the user supplied is an item; every discovered PR is approved (item) or declined (context only).

## Per-item intake

Run Step 1 for each item separately: `gh` metadata, existing reviews, commits, and source selection per [PR-SOURCE.md](PR-SOURCE.md). Each item gets its own manifest, diff, and source; items stay separate end to end.

**Completion criterion:** every item has a manifest with a verified source, and any pending review of the user's on that PR is noted for resolution before posting ([GITHUB-REVIEW.md](GITHUB-REVIEW.md)).

## Shared context

Gather once and pass to every critic and validator: ticket and AC, linked tickets and epic, sibling-repository paths, and the intel brief. Each item's source is also contract evidence for the others — read the other item's contract and one consumer before a cross-PR semantic or compatibility finding. Tag a fact with its item when it applies to one.

## Delivery

Deliver each item through [GITHUB-REVIEW.md](GITHUB-REVIEW.md#review-set).

**Completion criterion:** for each item, accepted findings = posted (*post*) + skipped (*continue*), and its pending review is submitted or discarded. The final report lists these counts per item beside the release report from [PR-SOURCE.md](PR-SOURCE.md#release).
