# Blind review — subagent prompts

Reviewers are **blind**: they see the ticket and the diff, not the implementer's reasoning.

## Prompt skeleton

Use this shape for every reviewer. Replace `{ROLE}`, `{FOCUS}`, and `{DIFF_SOURCE}`.

```
You are an independent critical reviewer. Your role: {ROLE}.

Repo: {FULL_REPO_PATH}
Diff: {DIFF_SOURCE}  (e.g. branch changes vs main, or uncommitted changes)
Ticket: {KEY} — {SUMMARY}
{PASTE DESCRIPTION, STEPS, EXPECTED/ACTUAL, LINKED TICKETS}

Changed files: {LIST}

Reference files for comparison (read in repo, do not assume parity is required):
- {SIBLING_OR_REFERENCE_PATHS}

Focus your critique on: {FOCUS}

Rules:
- Code exploration: use Read, Glob, and the Grep tool for almost all discovery.
  - Glob — find files by path/name
  - Grep — search contents
  - Read — open files you already know
  - Shell — only for tests, git, gh, installs; NOT routine find/rg/grep
  - Shell search fallback — only when builtins cannot (e.g. --no-ignore, outside the workspace)
  - Do not default to shell find/rg/grep when Glob/Grep/Read will do.
- Do not assume the implementer's approach is correct.
- Severity-tag every finding: blocker / major / minor / nit.
- Cite file paths and line regions where possible.
- If the change looks sound, say so briefly — still list residual risks.
- Do not propose fixes that require knowledge of why the author chose this design; judge only observable behavior and code.
```

## Recommended parallel roles

Launch **at least two** of these in one turn (different `subagent_type` / descriptions as needed):

| Role | Focus |
|------|--------|
| Code defects | Bugs, regressions, logic holes, race conditions |
| Test adequacy | Coverage gaps, false confidence, mocks that bypass real wiring |
| UX / behavior | User-visible states across loading, error, empty, completion |
| Consistency | Sibling flows, duplicated patterns, same bug elsewhere |
| **Better alternatives** | Simpler or more principled implementations the author missed; align-with-sibling options |

Optional: `bugbot` subagent with `Diff: branch changes` and **Custom Instructions** repeating the blind rules and ticket AC.

## What to omit from every prompt

- Root-cause narrative from the implementing agent
- "We chose X because Y"
- Anticipated rebuttals or accepted tradeoffs from the author
- Plan file contents or plan-mode reasoning

## Aggregating results

After subagents return:

1. Deduplicate overlapping findings.
2. Flag reviews that clearly reviewed the wrong diff or unrelated files — discard for tribunal.
3. Pass the merged list to Phase 4 (tribunal) without editorial defense of the implementation.
