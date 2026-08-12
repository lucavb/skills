# conversation-handoff

## Problem

A conversation drifts onto a tangent that deserves its own thread, or gets so compacted that the agent cannot reliably continue — and starting fresh means re-explaining everything from scratch.

## What it does

Produces a copy-pasteable handoff with the focus, evidence-backed context, links to artifacts instead of copies, open questions, and suggested skills for the new session. It posts to chat by default; it writes a file only when requested.

## When to install

Install when you regularly split tangents into new chats, or reset degraded conversations.

```bash
npx skills add lucavb/skills --skill conversation-handoff
```

## Prerequisites

None. Works with any agent that supports skills.
