---
name: review-tribunal
description: >-
  Review tribunal for open PRs: blind parallel critics, adjudicate hold/reject/defer,
  adversarial re-validation of holds, then interactive post/continue GitHub review
  comments. Use when the user asks to review a PR, spawn a review tribunal, leave no
  stone unturned on a pull request, or adversarially validate findings before posting.
---

# Review tribunal

A **tribunal** run is the same **process** every PR: **blind** critics → adjudicate → **adversarial** validators → interactive **post/continue** GitHub review. Predictability over improvisation.

This skill reviews **someone else's (or any open) PR**. When you are the implementer inside a build pipeline, ticket-to-pr-pipeline Phases 3–4 are the cousin flow — same **blind** / **tribunal** meanings; do not fork them.

## Steps

### 1. Intake + intel

1. Fetch PR metadata (`gh pr view`, files, commits, existing reviews).
2. Fetch ticket/AC from Jira (or pasted AC). Pull linked tickets and epic context when they change blast radius or ownership (FE vs BE).
3. Checkout or fetch the PR branch so **Read** / **Grep** / **Glob** hit the same tree as the diff.
4. Ask the user for **sibling repo** paths when the AC spans FE/libs (do not scrape GitHub for source you can open locally).
5. Skim enough **intel** to brief critics: entrypoint routing, sibling implementations, prior art on base — facts only, not author intent.

**Completion criterion:** PR URL, head SHA, ticket AC, changed-file list, sibling paths (or N/A), and a short intel brief ready for critic prompts.

### 2. Blind critics

Spawn parallel **blind** judges — ticket + diff + intel facts only; no implementer rationale.

The lens **roster** (security, code quality, bug introduction, consistency, testing, **alternatives**, AC/behavior) is a menu of what is possible / usually required — not a mandate to run every lens every time. Details: [BLIND-REVIEW.md](BLIND-REVIEW.md).

- Pick distinct lenses that fit the PR; **prefer covering** security, bugs/regressions, tests, consistency, and especially **alternatives** unless you have a reason to skip.
- Spawn **more** freely when a thread needs depth.
- Divert from the roster only with a **good reason** (note it on the scorecard).
- Floor: ≥2 independent critics with different lenses.

Paste the code-exploration rules from BLIND-REVIEW into every subagent prompt.

**Completion criterion:** ≥2 independent reviews returned; wrong-diff reviews discarded; skipped roster lenses noted with reason.

### 3. First tribunal

You are the judge, not the author's advocate. For every material finding: **Holds up** / **Reject** / **Defer**.

Challenge bar and common patterns: [TRIBUNAL.md](TRIBUNAL.md). Verify claims with **Read** / **Grep** / **Glob** before ruling.

Publish a scorecard to the user (finding → verdict → why). Do **not** post to GitHub yet.

**Completion criterion:** every material finding has an explicit verdict; user can see the audit trail.

### 4. Adversarial validation

Spawn a **second** wave whose job is to **disprove or downgrade** the **Holds up** items — not rubber-stamp them.

Feed validators: the finding, the first-tribunal rationale, ticket/AC, sibling-repo paths, and any Atlassian/FE evidence already gathered. Details: [ADVERSARIAL.md](ADVERSARIAL.md).

Re-adjudicate after validators return. Overturn freely when evidence wins.

**Completion criterion:** each prior Hold has a CONFIRMED / DOWNGRADE / REJECT / UPGRADE verdict with evidence; revised scorecard published.

### 5. Interactive GitHub review

Walk **remaining Holds** (and intentional Defer notes worth surfacing) one at a time with the user:

1. Explain the issue (2–4 sentences).
2. Show the exact comment in a blockquote.
3. Ask **post** or **continue** (continue = skip).
4. On **post**: leave the comment on a **pending** PR review; confirm the discussion URL; immediately present the next finding.
5. After the last finding: offer a review summary body, then **submit** the pending review (`COMMENT` or `REQUEST_CHANGES` per user).

Tone and ordering: blockers → majors → nits; problem before fix; one concern per comment; lead nits with `Nit:`.

GitHub mechanics (pending review, JSON `comments` array, GraphQL add-thread, diff-line constraint): [GITHUB-REVIEW.md](GITHUB-REVIEW.md) — **single source of truth**; do not invent alternate posting shapes.

**Completion criterion:** pending review submitted (or explicitly discarded); user has a posted-vs-skipped summary.

## Checklist

```
- [ ] Intake + intel (PR + AC + sibling paths + brief)
- [ ] Blind critics (≥2 distinct lenses; roster skips noted)
- [ ] First tribunal scorecard
- [ ] Adversarial validation + revised scorecard
- [ ] Interactive post/continue review submitted
```
