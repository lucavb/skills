---
name: writing-commit-messages
description: Write git commit messages that explain the why, not just the what, with reasoning and concrete references, matching each repo's existing commit style. Use when writing a commit message, running git commit, or drafting a commit body for staged changes.
---

Explain the *why*, not just the *what* — the diff already shows what changed; the message earns its place by carrying reasoning the diff can't.

## Match the repo's own style first

Before writing, check `git log --oneline -20` and a couple of full bodies (`git show --format='%B' -s <hash>`) for the target repo. Mirror its type prefixes, scope conventions, capitalization, and body structure exactly — style is per-repo, not universal.

## Subject line

- `type(scope): summary` or `type: summary` (scope optional), imperative mood, no trailing period.
- Default to conventional types (feat, fix, refactor, chore, docs, test, perf, ci) unless the repo's history shows otherwise.

## Body

- Blank line after the subject, then prose paragraphs — reasoning first: what problem existed, what constraint or bug forced the change, why this approach over the alternatives.
- Never restate the diff line-by-line; a reviewer can already read the diff. Say what the diff cannot: motivation, trade-offs, what you deliberately left out and why.
- Use a `Changes:` bullet list only when there are multiple discrete, independent changes worth enumerating separately — skip it for single-purpose commits, where one clear paragraph is enough.
- Reference concrete evidence where it exists: file names, function/class names, error messages, library or tool behavior, ticket numbers. "Fix the race condition" is weak; "Fix the race condition in `GitService.commitChanges` surfaced by `simple-git`'s `commit()` resolving before the index lock releases" is not.
- Call out intentional omissions explicitly ("Intentionally did not X, because Y") so a future reader doesn't reintroduce X as a fix.

## Before finalizing

Re-read the drafted message and confirm: the subject alone would make sense in `git log --oneline`; the body would still be useful to someone who has *not* looked at the diff; every "why" claim is backed by something concrete — a file, an error, a constraint — rather than asserted vaguely.
