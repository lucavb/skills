---
name: writing-commit-messages
description: Commit message pass for writing or running a git commit: use when a staged diff needs a message, when a user asks for commit-message help, or when another skill hands off a commit.
---

## Commit-message pass

Run this pass in order. Each step is complete only when its criterion is true.

1. **Learn the style.** In the target repository, inspect `git log --oneline -20`
   and two full bodies with `git show --format='%B' -s <hash>`.
   Criterion: the draft uses the repository's observed type, scope, capitalization,
   and body conventions.
2. **Bound the change.** Inspect `git status --short` and the complete staged diff.
   Classify every staged path and hunk as intended or unrelated. Separate unrelated
   work or ask the user before proceeding.
   Criterion: every staged hunk has an intended purpose; no unrelated hunk is hidden
   inside the commit.
3. **Write the message.** Use an imperative subject in the observed
   `type(scope): summary` style. After one blank line, explain the problem, the
   concrete constraint or evidence, and why this approach was chosen. Mention
   intentional omissions and blocked follow-up when they affect the change.
   Use prose for one cohesive change; use a `Changes:` list only for genuinely
   independent changes. Ground why-claims in concrete files, symbols, errors,
   behavior, or tickets.
   Criterion: the subject states the intent, while the body adds reasoning that the
   diff cannot show.
4. **Cross-check.** Compare the message line by line with the staged diff. Remove
   claims supported only by unstaged files, assumptions, or unrun validation.
   Criterion: every staged change is accounted for, every why-claim has concrete
   evidence, and the message contains no unrelated claim.
5. **Report the handoff.** After a commit, report its hash and whether unrelated
   work remains in the working tree. Treat a commit as repository state only;
   report deployment or validation only when its evidence was actually observed.
   Criterion: the final report distinguishes committed, uncommitted, validated,
   deployed, and blocked states.
