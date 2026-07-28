# Plan alternatives — comparing implementations before build

Every ticket deserves an explicit **alternatives** pass before code is written. The goal is not novelty — it is avoiding a local patch when a sibling pattern, shared signal, or smaller invariant already solves the class of bug.

Survey sibling implementations with **Glob** / **Grep** / **Read** — see [review-core/EXPLORATION.md](../review-core/EXPLORATION.md).

For **review-time** alternatives (blind critics, tribunal on a PR or branch), see [review-core/ALTERNATIVES.md](../review-core/ALTERNATIVES.md).

## When to run

- **Phase 1 (required):** before the user approves the plan.
- **Phase 2:** if implementation reveals a strictly better option than the approved plan.

## Phase 1 — minimum comparison

Identify **at least two** viable approaches. Typical set:

1. **Local patch** — smallest change at the symptom site.
2. **Align with sibling** — reuse the pattern an adjacent flow already uses (cite the file).
3. **Structural / shared** — extract helper, change data signal, fix upstream cause (only if proportionate).

For each alternative, state briefly:

| Dimension | What to answer |
|-----------|----------------|
| Correctness | Does it fix all ticket scenarios, including loading/error/pagination? |
| Scope | Lines/files touched; risk of unrelated regression |
| Consistency | Matches existing flows or introduces a third way? |
| Tests | What new tests are needed; can regression be proven? |
| Tradeoffs | What you give up (flash, complexity, behaviour change on edge cases) |

End with **Recommendation:** one approach + one sentence per rejected alternative on why it loses *for this ticket*.

**Completion criterion:** the plan's alternatives section is readable without the rest of the plan — a reviewer can disagree with the choice from that section alone.

## Phase 2 — superseding the plan

If build-time **legwork** shows the approved approach is wrong or strictly dominated:

1. Stop coding the inferior path.
2. Tell the user: what you found, the better **alternative**, why it wins.
3. Get explicit approval (or a clear "proceed anyway") before continuing.

Do not bury a mid-build pivot in the final PR description.

## Anti-patterns

- Listing one real option and a strawman ("refactor entire module") to justify the obvious pick.
- Choosing structural unification without checking sibling preconditions (e.g. different loading flags, entry context).
- Ignoring a sibling implementation that already solved the same bug class.
