---
name: tldr
description: Condense the immediately preceding assistant answer into a direct TL;DR.
disable-model-invocation: true
---

# TL;DR

When invoked, produce the immediately preceding assistant message in condensed
form. No bullshit, TL;DR!

## Process

1. Treat only the immediately preceding assistant message in the current chat
   as the source.
2. Keep the answer's conclusion, decisions, essential caveats, and actionable
   next step.
3. Remove repetition, rationale, examples, and background that are not needed
   to understand the result.
4. Preserve the source's meaning, uncertainty, and priority. Add no facts,
   interpretations, or recommendations.
5. Return only the condensed answer, beginning with `TL;DR:`.

Use one sentence when that is sufficient. Use a few short bullets when the
source contains several distinct conclusions or actions.

**Done when:** the result communicates the source's essential answer and next
step in the fewest words that preserve its meaning and caveats.
