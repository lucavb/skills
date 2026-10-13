---
name: scrum-next
description: Scrum board next-work triage. Use when asked what to work on next, what is next on the board, or to choose an actionable Jira task, updates on the user's open PRs, or a PR review.
---

# Scrum next-work triage

Recommend work the user can start now. Treat the board as a queue, not as proof that an item is actionable.

## Triage

1. Identify the current user and active sprint.
2. Record any work the user says is already running elsewhere as **occupied**. Keep it out of recommendations until the user says it is free.
3. Build candidates in this order:
   1. assigned implementation or refinement work that is ready to start;
   2. the user's own open PRs that need a response (new review feedback, requested changes, failing checks, merge conflicts, or unresolved review threads awaiting the author);
   3. unassigned, ready implementation or refinement work in the active sprint;
   4. open PRs authored by someone else that still need the user's review.
4. Exclude QA work, tickets in QA review, tickets the user implemented, reviews the user has already approved on the current head, and work already in progress elsewhere. Do not exclude the user's own PRs when they need author action.

## Evidence

For every candidate, verify the evidence before recommending it:

- **Jira:** active-sprint membership, status, assignee, rank, dependencies, and ticket readiness.
- **GitHub (review):** PR exists and is open; author is not the user; user has not approved the current head; checks, mergeability, and unresolved review threads are known.
- **GitHub (own PR):** PR is open and authored by the user; there is new activity since the user's last response (review comments, review decisions, check runs, or mergeability) that requires author action.
- **Scope:** the work is implementation, refinement, or code review—not QA.

Use narrow queries first. Fetch full ticket or PR details only for the leading candidates.

## Choice

Recommend one item, with its link and the immediate first action. State why it is actionable using the evidence above.

If no active-sprint item qualifies, say so plainly. Offer the highest-ranked unassigned backlog candidate only after marking it as outside the active sprint, or ask whether the user wants to pull backlog work.

## Completion

Finish only when the recommendation is actionable for this user now, or when the absence of such work is explicit.
