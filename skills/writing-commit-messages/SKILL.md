---
name: writing-commit-messages
description: >-
  Required before every git commit. Run this pass when staging, committing, push,
  or any workflow says commit — plan todos, AGENTS.md deploy flow, user "commit
  and push", handoffs from other skills, or drafting feat(scope) from memory.
---

## Hard rule

Complete steps 1–4 before `git commit`. Every commit path — plan todos, deploy
flows, user "commit and push", and handoffs from other skills — runs this pass
first; git prep elsewhere does not satisfy it.

## When to use

- User or plan says commit, push, or "implement and deploy"
- Repo workflow (e.g. AGENTS.md) requires commit before push
- Another skill ends with "commit these changes"
- You are about to run `git commit` for any reason

## Does not replace

Git safety protocol (no amend unless allowed, no force push, no skip hooks) and
staging discipline (explicit paths, no secrets) stay in their owning rules. This
pass governs message quality and diff alignment only; hooks and CI remain the
server-side gate.

## Commit-message pass

Run in order. Each step is complete only when its criterion is true.

**Mode:** draft the message unless the user explicitly asked to create the commit.
Commit mode adds repository mutation after Step 4.

1. **Learn the style and bound the change** (run in parallel):
   - `git log --oneline -20` and two full bodies with
     `git show --format='%B' -s <hash>`
   - `git status --short` and the complete staged diff (`git diff --cached`)
   - Provenance: the sources already in this conversation (the user's request
     wording, fetched pages, search results, ticket text) that explain why the
     change is needed and what the old behavior was meant to do, and the footer
     style in the logged bodies (`Refs:`, `See:`, `Closes #`)
   Classify every staged path and hunk as intended or unrelated. In draft mode,
   report unrelated work without changing the index. In commit mode, restage only
   within the user's commit authorization; ask when intended scope is ambiguous.
   Criterion: the draft matches the repository's observed scope,
   capitalization, and body conventions; every staged hunk has an intended
   purpose with no unrelated hunk hidden inside the commit.
2. **Write the message.** Use the repository's observed subject format and
   capitalization. When history uses Conventional Commits, follow its
   `type(scope): summary` shape.
   Pick the type by the *as-designed* test, which outranks the type usage in
   `git log`: history governs style, intent governs type.
   - `fix` repairs a *defect*: behavior that contradicted its intent, evidenced
     by an error, wrong output, failing test, or ticket. Motivation (annoyance,
     noise, cost, preference) is not evidence.
   - Behavior that worked as designed but should now differ is `feat`, even for
     a one-value diff: retuned threshold, raised limit, altered default, "make
     X quieter/faster/stricter". Example: "raise the threshold for fail2ban
     alerts significantly", prompted by too many alerts, is
     `feat(fail2ban): raise alert threshold to ...`; the old alerts fired as
     designed.
   - `refactor`, `perf`, `docs`, `test`, `build`, `ci`, `chore` keep their usual
     domains.

   After one blank line, explain the problem, the
   concrete constraint or evidence, and why this approach was chosen. Mention
   intentional omissions and blocked follow-up when they affect the change.
   Use prose for one cohesive change; use a `Changes:` list only for genuinely
   independent changes. Ground why-claims in concrete files, symbols, errors,
   behavior, or tickets.
   Cite provenance when a why-claim rests on external behavior (service limits,
   API semantics, deprecations, version constraints): end the message with a
   blank line and `Sources:` (or the repo's footer keyword), one line per source,
   at most three:
   `- <URL> — <abstract of the passage relied on> (<doc version or date>)`.
   The abstract keeps the rationale readable after the page changes. Example:
   `- https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html — max function timeout is 900 s, hence the 15 min cap (checked 2026-11)`
   Criterion: the type follows the as-designed test and every `fix` names the
   intent the old behavior failed; the subject states the intent, while the body
   adds reasoning that the diff cannot show.
3. **Cross-check.** Compare the message line by line with the staged diff. Remove
   claims supported only by unstaged files, assumptions, or unrun validation.
   Criterion: every staged change is accounted for, every why-claim has concrete
   evidence, every footer URL appears verbatim in this conversation, every
   abstract matches its source, every external-behavior why-claim carries a
   source or is softened, every `fix` cites defect evidence from this
   conversation (otherwise retype it), and the message contains no unrelated
   claim.
4. **State and deliver.** Before `git commit` (commit mode) or before returning
   (draft mode), state in the reply: the chosen subject, one sentence of body
   rationale, the cited sources (or "no external source applicable"; when the
   change leans on external behavior and the conversation holds no source, say
   so), one sentence when the chosen type diverges from earlier commits in
   `git log` for similar changes, and any blocked follow-up (e.g. values not in
   this commit). In
   commit mode, create the commit, then report its hash and whether unrelated work
   remains in the working tree. Treat a commit as repository state only; report
   deployment or validation only when its evidence was actually observed.
   Criterion: the pre-commit statement is present; draft mode returns a
   diff-grounded message only; commit mode distinguishes committed, uncommitted,
   validated, deployed, and blocked states.
