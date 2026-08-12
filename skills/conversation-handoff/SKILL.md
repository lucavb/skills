---
name: conversation-handoff
description: >-
  Summarize the current conversation into a copy-pasteable handoff message for
  a fresh chat. Use when a topic has drifted too far from the original
  conversation and should be split into its own thread, or when the
  conversation has been compacted so heavily that context is unreliable and
  needs a clean restart.
argument-hint: "What should the new conversation focus on?"
disable-model-invocation: true
---

# conversation-handoff

## When to use

- **Fork**: this thread drifted onto a tangent that deserves its own conversation. The original thread keeps going untouched.
- **Reset**: this conversation is degraded — heavy compaction, lost context — and needs a clean restart rather than continuing to patch over confusion.

## Output: chat message by default

Default to posting the handoff as your final chat message, formatted to survive a "copy last message" action — the practical workflow is: copy this message → `Cmd+N` → paste into the new chat. Writing to a file is fine, just not the default: only do it if the user asks (for example, "put this in a file" or "save this").

## Ground it before writing

For a **reset**, don't trust conversational memory — heavy compaction can drop or invent facts. Re-verify claims against actual state (git status/diff, file contents, command output) before including them. Cite file paths and line numbers instead of restating file contents.

## Structure

1. **Focus** — one line: what the new conversation is for. Use the argument if passed; otherwise infer it from the tangent (fork) or original goal (reset).
2. **Scope note** *(fork only)* — state that this is a split-off sub-topic; the original conversation is unaffected and keeps its own context.
3. **Context** — evidence-backed recap: decisions made and why, plus what has been ruled out. Do not present unsourced claims as facts.
4. **Artifacts, not copies** — link existing plan files, PRs, diffs, commits, and issues instead of re-pasting their content.
5. **Open questions** — what remains unresolved and what the new session should determine next.
6. **Suggested skills** — name specific skills the new session should invoke.

Redact secrets, API keys, and PII before output.

## Guardrails

- Chat is the default output; a file is fine when the user asks for one.
- Do not commit.
- Prefer references over verbatim reproduction. Keep it short enough to comfortably paste into a new chat.
