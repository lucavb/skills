# agent-handover

## Problem

Investigation and incident sessions end with context trapped in chat. The next agent (or a fresh session) re-investigates from scratch — re-running the same PromQL queries, re-reading the same logs, re-deriving hypotheses you already ruled out.

## What it does

Guides the agent to produce a **handover document** with evidence-backed sections: symptom table, error signatures, verify commands, fix directions, and success criteria. Asks the user first whether delivery should be chat-only, a file in `docs/`, or both.

## When to install

Install when you frequently hand off work between agents or sessions — incident response, long investigations, or "inform the next agent" workflows.

```bash
npx skills add lucavb/skills --skill agent-handover
```

## Prerequisites

None. Works with any agent that supports skills.
