---
name: review-tribunal
description: >-
  Review tribunal for open PRs: PR intake, then review-core blind critics (including
  alternatives), tribunal, adversarial validation, and interactive post/continue GitHub
  review. Requires review-core. Use when reviewing a PR, spawning a review tribunal,
  or adversarially validating findings before posting.
---

# Review tribunal

A **tribunal** run is the same **process** every PR: intake → **review-core** (blind → tribunal → adversarial) → interactive **post/continue** GitHub review. Predictability over improvisation.

**Requires [review-core](../review-core/SKILL.md)** installed as a sibling skill.

This skill reviews **someone else's (or any open) PR**. When you are the implementer building from a ticket, use [ticket-to-pr-pipeline](../ticket-to-pr-pipeline/SKILL.md) Phases 3–4 with `mode: implement` instead.

## Steps

### 1. Intake + intel

1. Fetch PR metadata (`gh pr view`, files, commits, existing reviews).
2. Fetch ticket/AC from Jira (or pasted AC). Pull linked tickets and epic context when they change blast radius or ownership (FE vs BE).
3. Checkout or fetch the PR branch so **Read** / **Grep** / **Glob** hit the same tree as the diff.
4. Ask the user for **sibling repo** paths when the AC spans FE/libs (do not scrape GitHub for source you can open locally).
5. Skim enough **intel** to brief critics: entrypoint routing, sibling implementations, prior art on base — facts only, not author intent.

**Completion criterion:** PR URL, head SHA, ticket AC, changed-file list, sibling paths (or N/A), and a short intel brief ready for critic prompts.

### 2–4. Review core (`mode: review`)

Run [review-core](../review-core/SKILL.md) Steps 1–3 with **`mode: review`**.

Inputs to pass:
- Ticket + AC + linked tickets
- PR diff (`gh pr diff` or `origin/main...HEAD` on PR branch)
- Intel brief from Step 1
- Sibling repo paths (local Read preferred)

**Alternatives critic is required** — PR reviews must surface cleaner, simpler, or more consistent implementations, not just bugs. See [review-core/BLIND-REVIEW.md](../review-core/BLIND-REVIEW.md) and [review-core/ALTERNATIVES.md](../review-core/ALTERNATIVES.md).

Do **not** post to GitHub during review-core. Publish scorecards to the user after tribunal and after adversarial validation.

**Completion criterion:** revised scorecard with adversarial verdicts on all Holds.

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
- [ ] review-core: blind critics (≥2 lenses; alternatives required)
- [ ] review-core: first tribunal scorecard
- [ ] review-core: adversarial validation + revised scorecard
- [ ] Interactive post/continue review submitted
```
