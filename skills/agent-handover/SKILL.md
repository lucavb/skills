---
name: agent-handover
description: >-
  Write agent handover documents after investigation or incident work. Use when
  the user asks for a handover, handoff doc, context for another agent, or
  "inform the next agent" — before writing any file or long paste.
---

# agent-handover

A **handover** gives the next agent enough context to **fix** the problem, not re-investigate it.

## 1. Ask delivery first

**Before drafting or writing anything**, use AskQuestion:

| Option | Action |
|--------|--------|
| Chat only | Paste in the conversation; do not create a file |
| File in `docs/` | Write `docs/<topic>-handover.md` (kebab-case) |
| Both | File + short summary in chat with link |
| Custom path | User specifies path |

**Completion criterion:** user has chosen a delivery target; no file exists until they pick file or both.

## 2. Draft the handover

Structure (omit empty sections):

1. **Status** — open/closed, date, one-line trigger
2. **Symptom table** — component vs healthy/broken
3. **Error signature** — exact log lines / PromQL / HTTP codes
4. **Architecture** — only paths involved in the issue
5. **Root-cause hypothesis** — what is ruled out vs likely
6. **Verify commands** — copy-paste checks to confirm state
7. **Fix directions** — ordered options, not a single guess
8. **Key files** — paths to change
9. **Deploy rules** — pipeline vs local apply for this repo
10. **Related completed work** — do not redo
11. **Success criteria** — checkable "fixed" definition

**Completion criterion:** every section is backed by evidence from this session (commands run, metrics, logs) — no unsourced guesses labeled as fact.

## 3. Deliver

- **Chat:** concise; link to repo paths with markdown paths
- **File:** same content; follow repo `docs/` tone (tables + command blocks OK)
- **Both:** file is canonical; chat gets 3–5 bullet summary + link

**Completion criterion:** output matches the delivery choice from step 1.

## Guardrails

- Do not commit unless the user asks
- Do not decrypt or paste secrets
- Separate **symptoms** (observed) from **hypothesis** (inferred)
- Prefer verify commands over narrative

## Example

`docs/loki-ingest-handover.md` in home-ansible — Loki push 500s after Forgejo observability rollout.
