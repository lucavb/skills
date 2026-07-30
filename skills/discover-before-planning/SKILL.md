---
name: discover-before-planning
description: >-
  Do discovery during planning — explore the codebase and close open questions
  before presenting a plan. Use when drafting implementation plans, or when a
  plan would defer verification or "pre-flight" checks to execution.
---

# Discover before planning

Walk down every branch of the design tree and resolve dependencies **one-by-one** before the plan lands. The plan is the record of decisions already made — not a place to discover them later.

If a question can be answered by exploring the codebase or read-only checks, **explore instead of deferring**. Only escalate to the user what you genuinely cannot close alone — ask now, not in a future phase.

**Done when:** no plan step exists solely to answer a question you could have resolved during planning.
