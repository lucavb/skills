# Local diff — source resolution and reporting

Use this branch after `review-tribunal` selects `local-diff`. Resolve the local source, then fill the source manifest defined in [review-core](../review-core/SKILL.md).

## Resolve the source

Honor the user's source before inferring one:

1. Explicit range such as `main...HEAD`, `v2.1..HEAD`, or `abc123^!` — validate and use it as written.
2. Named base versus current branch — resolve as `{base}...HEAD`.
3. Commit or commit list — resolve to the narrowest Git revision expression that represents it.
4. Working tree, staged, or unstaged request — use the matching working-tree components below.
5. No source — infer the repository's default branch when it is unambiguous; otherwise ask for the base.

For a named base, validate the local ref first. When it is absent and `origin/{base}` exists, use the remote-tracking ref and record the substitution. Ask for the base when neither resolves.

Three-dot comparison is the branch-review default because it shows changes since the merge base. Preserve an explicit two-dot range.

## Working-tree scope

A branch or commit range contains committed changes only. Include working-tree state when the user requests it, and record each component separately:

| Requested state | Source |
|---|---|
| staged | `git diff --cached` |
| unstaged | `git diff` |
| working tree / all local changes | requested committed range (if any), `git diff --cached`, `git diff`, and untracked files from `git status --short` |

Read untracked files directly and identify them as full-file additions. Deduplicate changed-file names across components while preserving each component in the manifest.

## Validate before review

Use read-only Git commands to establish:

- repository root and current branch or detached-head state;
- resolved base/range and `git rev-parse HEAD`;
- changed-file list for every included component;
- when the range includes commits, commit count, SHAs, and the `git log` commands used — per [COMMIT-HYGIENE.md](../review-core/COMMIT-HYGIENE.md);
- non-empty diff content.

An empty resolved source ends intake with a concise “no changes to review” result. A missing or ambiguous ref returns to the user for one focused base choice.

## Source manifest

Set `Target` to `local-diff`, put the exact range and working-tree sources in `Diff source`, and list every Git command used to obtain them. When the range includes commits, populate `Commits in range`, `Commit SHAs`, and `Commit commands` in the manifest. Pass the completed manifest to every critic and validator, then reproduce it in both scorecards and the final report.

Critic output that addresses files or revisions outside the manifest is a wrong-diff review and does not enter the tribunal.

**Completion criterion:** every reviewed byte belongs to a named manifest component, the manifest resolves to non-empty content, and all critics and validators receive the identical manifest.

## Local report

The revised adversarial scorecard is the final review artifact. Anchor each remaining Hold to the reviewed diff with a file and line region. Include:

1. Source manifest.
2. Holds ordered by severity, each with evidence, impact, and recommendation.
3. Rejected, deferred, downgraded, and overturned findings as the audit trail.
4. Counts by final verdict and residual risks.

**Completion criterion:** every material critic finding is traceable from initial claim to final verdict, and every remaining Hold cites evidence inside the source manifest.
