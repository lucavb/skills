# Pipeline continuity

**Continuity** — after plan approval, phases 2→5 run in one session until a PR URL lands or the user scopes out a phase. A pipeline **session** starts when this skill is invoked for a ticket and ends at Phase 5 or an explicit stop.

## Phrase → phases

| After Phase 1 plan exists, user says… | Run |
|---------------------------------------|-----|
| implement / execute / go ahead / ok / plan approved | 2 → 3 → 4 → 5 |
| build only / just implement | 2 |
| review what we have | 3 → 4 |
| commit and PR / open a PR | 3 → 4 if not done, then 5 |
| stop before PR | through 4, not 5 |

Implement the plan means the full remainder (2→5), not build-only.

## While continuity holds

- Phase 2 complete → start Phase 3 in the same session.
- Phase 4 complete → start Phase 5 in the same session (unless scoped out above).
- Show the pipeline checklist after Phase 1; update it after each phase.
- Phase 5 includes commit and PR — ticket + pipeline invocation is the user's ask for ship.

## Blocked

Stop only at a real blocker (product decision, auth, push denied). Name the phase, what failed, and what remains. Green tests alone is not pipeline-complete.
