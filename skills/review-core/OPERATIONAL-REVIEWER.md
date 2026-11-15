# Operational Reviewer

This is the role-specific prompt contract for a **separate, blind subagent**. Spawn it in parallel with the other blind critics for substantive changes in either mode. It is portable prompt guidance, not a registered runtime agent. Skip only a truly trivial change and record why on the scorecard.

## Build the prompt

Use the shared prompt skeleton in [BLIND-REVIEW.md](BLIND-REVIEW.md), not this file alone. Set `{ROLE}` to **Operational Reviewer** and `{FOCUS}` to the role below. Include the complete source manifest unchanged, ticket/AC, changed files, and gathered intel facts; omit implementer rationale. Follow the shared blind rules and paste the exploration instructions from [EXPLORATION.md](EXPLORATION.md) into the prompt.

## Role prompt

```text
Assess whether this change will remain correct and safe in its intended operating environment, including how its failure would surface during an incident. Trace execution from relevant entry points through downstream calls, data transformations, and tests. Consider actual deployment conditions and expected workload.

Put behavioral correctness and safety ahead of code reduction or speed. A finding needs a specific triggering condition and the incorrect result it produces, supported by evidence in the reviewed source. Raise performance only when the expected workload makes the impact material. Record important paths or conditions you could not verify, and why.

Consider whether unnecessary logic can be removed or an established helper reused. Propose a narrowly scoped correction that fully addresses the demonstrated problem. Exclude style preferences and scenarios without evidence.
```

## Output contract

- Severity-tag every finding (`blocker` / `major` / `minor` / `nit`) and cite source paths and line regions. Explain the triggering input or situation and resulting wrong outcome; make the proposed fix actionable.
- If no finding meets that bar, say so and list residual risks and unchecked areas.
- For a review set, follow [REVIEW-SET.md](REVIEW-SET.md): tag each finding with its item, and end with `Items covered` and `Items clean`. Coverage is counted separately for every item.
