# Hygiene — commit structure and messages

**Hygiene** judges whether commits on the reviewed branch are merge-ready: atomic, scoped, and honestly described. Message bar at commit time: [writing-commit-messages](../writing-commit-messages/SKILL.md). This file is the review-time bar.

## When

| Manifest state | Hygiene critic |
|----------------|----------------|
| Lists commits in range | **Required** — spawn a dedicated hygiene critic |
| No commits (working-tree only) | **Skip** commit-structure review; note skip on scorecard; judge staged **scope** only |
| Working-tree + commits | Per-commit checks on listed SHAs; staged scope on manifest working-tree components |

## Inspect

Read-only Git — run what the manifest needs; record exact commands in `Commit commands`:

```bash
git log --oneline <range>
git log --format='%H%n%s%n%b%n---' <range>
git show --stat <sha>
git show <sha> -- <path>
git diff --cached          # staged scope when manifest includes STAGED
git log --oneline -20      # repo style baseline
```

Per commit: read subject, body, file list (`--stat`), and that commit's patch. Compare message claims to that commit's diff only — not the aggregate branch diff.

## Holds

Default verdict for blocker/major hygiene findings: tribunal **Hold**.

| Check | Hold when |
|-------|-----------|
| **Atomicity** | One commit mixes unrelated concerns (feature + drive-by refactor, unrelated formatting, accidental files) |
| **Scope** | Debug artifacts, temp files, unrelated config/deps, or hunks that do not serve the ticket/change — in a commit or staged set |
| **Message** | Substantive commit with missing/empty subject, subject that restates the diff without intent, or no body when why is not obvious from the patch — per [writing-commit-messages](../writing-commit-messages/SKILL.md) |
| **Alignment** | Message claims behavior or files not in that commit's diff, or omits major hunks the commit contains |
| **History** | WIP/fixup/"address review" noise on a merge-bound branch; commits that must split or squash before merge |
| **Style** | Clear deviation from this repo's `git log` conventions (type/scope, imperative subject, body norms) |

Severity tags (critics): **blocker** / **major** / **minor** / **nit**. Blocker and major → default Hold.

## Reject

Tribunal **Reject** when the hygiene finding is:

- Pre-existing history on the base, not introduced in the reviewed range
- Squash-vs-keep preference with no atomicity or message harm
- Elegance-only message taste with no misalignment between message and diff

## Defer

Hygiene findings are **blocking** — tribunal **Defer** is rare. Use only when the fix is explicitly out of scope for this change (e.g. separate cleanup ticket already filed and linked).

## Adversarial disproof

Validators may **Reject** or **Downgrade** hygiene Holds when:

- Mixed hunks are ticket-required and documented in AC
- The diff is trivial and why is obvious without a body
- The cited commit is outside the manifest's reviewed range
- Message style matches repo convention on inspection of `git log`

## Critic prompt

Use the [BLIND-REVIEW.md](BLIND-REVIEW.md) prompt skeleton with:

- `{ROLE}`: **Hygiene**
- `{FOCUS}`: atomicity, scope, message alignment, history noise, repo log style — per this file

Add to the prompt:

```
Hygiene rules: see COMMIT-HYGIENE.md (full reference).

Required output:
1. Per-commit table: SHA | subject | verdict (clean / issue) | severity | one-line reason
2. Staged-scope findings (if manifest includes STAGED)
3. Residual risks
```

**Completion criterion:** every commit in the manifest is accounted for in the per-commit table; every issue cites SHA and evidence from that commit's diff or staged hunk.
