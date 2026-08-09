---
name: closing-ritual
description: >-
  Closing ritual — surface doubts, blind spots, and unverified claims before
  work is accepted. Use when the user signals acceptance or session end
  ("wrap up", "closing ritual", "before I accept this").
---

# Closing ritual

Run once, after a diff exists and before presenting work as done. Skip trivial
changes (typo, one-liner) — a forced report there invents flaws.

**Leading words:** **doubts**, **blind spots**, **unverified**.

## Steps

### 1. Interrogate

1. What am I least confident about in what I just did? — **doubts**: things
   glossed over or quietly assumed instead of asked.
2. What is the user probably missing that they haven't thought to ask? —
   **blind spots**: "you asked for X, but Y bites later."
3. What did I claim works without running or verifying it? — the **unverified**.

**Done when:** every answer traces to evidence — a file:line, a command not
run, an assumption made without asking — or is cut.

### 2. Report

```markdown
## Doubts
- <claim> — <why unsure> — <evidence> (or: Nothing)

## Blind spots
- <context> — <why it matters later> (or: Nothing)

## Unverified
- <claim> — <what would verify it> (or: Nothing)
```

Report only; the user decides what gets fixed. Large or risky diffs go to
review-core / review-tribunal instead.

**Done when:** every listed item carries evidence; empty sections say "Nothing".
