# GitHub PR — source selection

**Single source of truth** for where a `github-pr` item's code is read from, how the existing checkout is protected, and how the source is released. Applies to each PR in a [review set](PR-SET.md) independently. `local-diff` reads its tree in place per [LOCAL-DIFF.md](LOCAL-DIFF.md) and never uses this file.

Repeat per PR; fill that PR's own [source manifest](../review-core/SKILL.md).

## Pin

Read `headRefOid` with `gh pr view` once, then collect the diff. Re-read `headRefOid` afterwards; a mismatch restarts this PR's intake. The **pin** is that SHA; every source, critic, validator, and posted comment uses it. A **re-pin** (new head found at any later point) restarts only that PR, from intake through its own critics and validators.

## Locate

Use the user's path, else the workspace. Confirm `git -C {path} remote get-url origin` names `{owner}/{repo}`. Without a match, ask for the path.

## Choose a source

Take the first that applies.

1. **Reuse** (`REUSED_CHECKOUT`) — `git status --porcelain --untracked-files=all` is empty, no merge/rebase/cherry-pick is in progress, and `git rev-parse HEAD` equals the pin. Read in place.
2. **Detached worktree** (`DETACHED_WORKTREE`) — fetch the pin without touching any branch (`git fetch {remote} refs/pull/{n}/head`; `FETCH_HEAD` must equal the pin), then `git worktree add --detach {path} {pin}`. The existing checkout stays untouched.
   - Follow the `worktrees` skill for path and approval; creation needs explicit approval. Without that skill, ask for approval and place the worktree outside the repository (`$TMPDIR/review-{repo}-{n}`).
   - The approval request lists each path, each pin, and every file the skill will modify in the repository (such as ignore blocks).
   - One request may cover every worktree of a set.
   - Declined approval or an unfetchable pin makes the worktree *not feasible*.
3. **Stash** (`STASHED_CHECKOUT`) — only when a worktree is not feasible, and only after explicit approval.

## Stash

Ask before touching the checkout; the request names:

- tracked files with changes, split into staged and unstaged;
- untracked files (the stash includes them);
- ignored files (untouched);
- the original branch (or detached HEAD) and SHA, and the pin it will move to.

Then:

1. Record the pre-state: `git rev-parse HEAD`, branch or detached, `git status --porcelain=v1 --untracked-files=all`, `git diff --cached --name-status`.
2. `git stash push --include-untracked -m "review-tribunal:{owner}/{repo}#{n}:{timestamp}"`.
3. Record the **exact stash**: `git rev-parse stash@{0}` after `git stash list --format='%H|%gs'` shows the message above. Restore by this SHA; stash positions shift.
4. Fetch the pin (as above) and `git switch --detach {pin}`.

A checkout holds one pin at a time. Submodules, an in-progress operation, or a second PR of the same repository needing this checkout is *not feasible* here: ask the user how to proceed. A declined stash ends this PR's intake; report it and ask for another checkout path or whether to drop the PR from the set.

## Manifest values

| Field | Value |
|---|---|
| `Target` | `github-pr` |
| `Review item` | `{owner}/{repo}#{n}` |
| `Repo` | the path critics read: checkout or worktree |
| `Head` | the pin |
| `Diff source` / `Commands` | `gh pr diff {n} --repo {owner}/{repo}` at the pin, and the other commands used |
| `Working-tree components` | `NONE` |
| `Commits in range`, `Commit SHAs`, `Commit commands` | from `gh pr view --json commits`, with that command |
| `Source mode` | `REUSED_CHECKOUT`, `DETACHED_WORKTREE`, or `STASHED_CHECKOUT` |
| `Source restore` | worktree path; or stash SHA, stash message, original branch and SHA; `N/A` for a reused checkout |

**Completion criterion:** `git -C {Repo} rev-parse HEAD` equals `Head` before critics start and again before validators start; the source is clean of review edits; every non-reused source has its restore record.

## Release

Run after delivery ends or the review is abandoned. Only sources this review created are released; a reused checkout needs nothing.

**Worktree.** Check `git -C {path} status --porcelain --untracked-files=all` and `git -C {path} rev-parse HEAD`. A dirty worktree or a moved HEAD is reported and left for the user. A clean worktree at the pin goes into one batched removal request per the `worktrees` skill; remove it after approval.

**Stash.**

1. Confirm the checkout is clean at the pin.
2. `git switch {original-branch}` (or `git switch --detach {original-sha}`) and confirm `HEAD` equals the original SHA.
3. `git stash apply --index {stash-sha}`.
4. Confirm status, staged names, and untracked files equal the recorded pre-state.
5. Resolve the SHA to its `stash@{n}` with `git stash list --format='%H %gd'`, then `git stash drop` that entry.

On any conflict or mismatch in steps 1–4, stop, report the state, and leave the stash intact; the user's changes stay in the stash until they decide.

**Completion criterion:** every created worktree is removed with approval or reported as retained with a reason; every stash is restored and dropped, or reported with its SHA; the report names each source path and its final state.
