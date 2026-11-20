# GitHub PR — source selection

**Single source of truth** for where a `github-pr` item's code is read from, how the existing checkout is protected, and how the source is released. Applies to each PR in a [review set](PR-SET.md) independently. `local-diff` reads its tree in place per [LOCAL-DIFF.md](LOCAL-DIFF.md) and never uses this file.

Repeat per PR; fill that PR's own [source manifest](../review-core/SKILL.md).

## Pin

Read `headRefOid` with `gh pr view {n} --repo {owner}/{repo} --json headRefOid --jq .headRefOid`, then collect `gh pr diff {n} --repo {owner}/{repo}`. Re-read `headRefOid` with the same command afterwards; a mismatch restarts this PR's intake. If either live-head read fails, stop and ask to restore verification; a stale ref or cached SHA is not a fallback. The **pin** is that API SHA; every source, critic, validator, and posted comment uses it. A **re-pin** (new head found at any later point) restarts only that PR, from intake through its own critics and validators.

## Locate

Use the user's path, else the workspace. Confirm `git -C {path} remote get-url origin` names `{owner}/{repo}`. Without a match, ask for the path.

## Choose a source

Before choosing a source, establish that the exact pin is an available commit object in the matching checkout. `HEAD` or a local tracking ref is a candidate locator only when `git -C {path} rev-parse --verify {candidate}^{commit}` resolves exactly to the live API pin; the pin SHA itself may be checked directly. A tracking ref resolving elsewhere is stale and ineligible. Verify the selected object with `git -C {path} cat-file -e {pin}^{commit}` and `git -C {path} rev-parse --verify {pin}^{commit}`; the latter must print the pin. Record and use that immutable full SHA for every operation, never a movable ref.

If the pin object is not local, attempt `git -C {path} fetch {remote} refs/pull/{n}/head` without updating any branch. On success, require `git -C {path} rev-parse --verify FETCH_HEAD^{commit}` to equal the pin, and verify the object with `cat-file` and `rev-parse` as above. A different `FETCH_HEAD` means the remote head changed: restart this PR's intake and re-read the live API head before collecting a new diff; never continue with the old pin or a stale ref. If fetch fails, recheck local availability by the pin SHA and verify the commit object again. Fetch failure alone does not prove the pin absent. Report a blocked/unreachable remote separately from an absent local object. If neither the local object nor fetch provides the pin, ask for another matching checkout or a decision to drop the PR; escalate as unavailable only after the available routes have failed to supply the required object. Do not read a nearby commit as a substitute.

A verified commit object does not prove its tree and blob objects are present. If checkout or source reads report genuinely missing required objects, first allow any configured promisor/alternate retrieval to complete. If objects remain missing, try a non-branch-updating `git -C {path} fetch --refetch {remote} {pin}` and require `FETCH_HEAD` to equal the pin; if the remote does not accept the exact SHA, try `git fetch --refetch {remote} refs/pull/{n}/head` and accept it only when `FETCH_HEAD` equals the pin. Retry the checkout/read and verify the required objects are available. On a failed fetch, recheck object availability; distinguish blocked/unreachable network from objects still missing. A PR-ref fetch mismatch restarts intake as above. If required objects remain unavailable after these routes, stop and escalate the source as unavailable; never substitute another commit or alter a branch to obtain the objects.

Take the first source that applies after the exact pin has been verified:

1. **Reuse** (`REUSED_CHECKOUT`) — `git status --porcelain --untracked-files=all` is empty, no merge/rebase/cherry-pick is in progress, and `git rev-parse HEAD` equals the verified pin. Read in place.
2. **Detached worktree** (`DETACHED_WORKTREE`) — when the verified pin object is available, run `git worktree add --detach {path} {pin}`. No fetch is needed when the object is already local. The existing checkout stays untouched.
   - Follow the `worktrees` skill for path and approval; creation needs explicit approval. Without that skill, ask for approval and place the worktree outside the repository (`$TMPDIR/review-{repo}-{n}`).
   - The approval request lists each path, each pin, and every file the skill will modify in the repository (such as ignore blocks).
   - One request may cover every worktree of a set.
   - Declined approval or an unavailable exact pin makes the worktree *not feasible*. An unavailable pin also blocks stash; first obtain the exact object from another available route.
3. **Stash** (`STASHED_CHECKOUT`) — only when a worktree is not feasible, the exact pin object has been verified locally, and the user has explicitly approved.

### Outcomes

- **Verified local pin, blocked fetch:** if `cat-file` and `rev-parse` verify the API pin as a commit object, use that SHA directly; no fetch is required. If a fetch was attempted and is blocked or unreachable, that does not invalidate the verified local pin.
- **Stale local ref:** if `origin/branch` resolves to a different SHA, reject that ref. If the exact API pin commit object is independently available locally, verify and use its immutable SHA without fetching. Fetch only when that commit object is absent, then proceed only if `FETCH_HEAD` equals the pin. A mismatch restarts intake; it never licenses use of the stale ref.
- **Unavailable live head:** if `gh pr view ... headRefOid` cannot be read before or after the diff, stop and ask for working GitHub access or a retry. Do not infer the head from a local ref, continue from an earlier pin, or collect a substitute diff. Separately, if the live API pin is verified but neither the local object nor available fetch/path routes can provide it, stop and escalate the missing source object with the fetch status distinguished from local availability.

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
4. Re-verify the pin object with `git cat-file -e {pin}^{commit}` and `git rev-parse --verify {pin}^{commit}` (must equal the pin), then `git switch --detach {pin}`. Confirm `git rev-parse HEAD` equals the pin. The stash route uses this verified object; it does not fetch unconditionally.

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

**Completion criterion:** `git -C {Repo} rev-parse HEAD` equals `Head` before critics start and again before validators start; the live API head was verified before and after diff collection; the exact commit object and required tree/blob objects are available, and all operations use the immutable SHA; the source is clean of review edits; every non-reused source has its restore record.

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
