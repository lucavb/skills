---
name: angular
description: >-
  Angular zoneless conventions — signals, toSignal, shells, encapsulated styles.
  Use for pages, forms, create/edit routes, route-driven loads, dates, shared UI
  library wiring, or SCSS/layout work.
---

# Angular

Zoneless Angular 22. State flows through **signals** and **RxJS** via **`toSignal`**.

**Leading words:** **shell** (route owns load + submit), **pipeline** (one observable chain per load), **draft** (`linkedSignal` form copy), **signals** (state via `signal` / `computed` / `toSignal`).

Stack facts: workspace **`AGENTS.md`** (standalone, locale strings, `ngModel`, shared UI library). **Styles:** same file — encapsulated SCSS, escalation ladder. Canonical workspace examples: named there.

## Contract

| Layer | Rule |
|-------|------|
| Component TS | `toSignal` bridges observables — zero `.subscribe()` in components. |
| Template | Signals with `()` — `@if (x(); as row)`. Signal reads, not `async` pipe. |
| Change detection | `ChangeDetectionStrategy.OnPush` on every component. |
| HTTP | `inject(HttpClient)` — `/api/...` directly, no shared API service. |
| UI | Shared UI library only — host components, not Bootstrap classes (`btn`, `ms-2`, …). |
| Styles | Local SCSS in the owning component or shared UI library. Climb the escalation ladder in `AGENTS.md`; `styles.scss` and `::ng-deep` are last resorts. |

Legacy pages still `.subscribe()` or use `route.snapshot` — **migrate when touched**, extend the modern pattern only.

## State ladder

Lowest rung that fits:

1. **`signal()`** — toggles, search text, page index.
2. **`computed()`** — derived values; narrow discriminated unions for templates (`loaded()`).
3. **`toSignal(obs$, { initialValue })`** — HTTP, submit lifecycle, **one pipeline** for route + fetch.
4. **`toObservable(signal).pipe(switchMap)` → `toSignal`** — writable signal must refetch (dependent selects, pagination filters). Not to re-read `paramMap` already in the same pipeline.
5. **`Subject` + `exhaustMap` → `toSignal`** — mutations (`SUBMIT_STATE`).

Every `toSignal` needs a typed `initialValue`.

## Steps

### Create or edit page

Follow [SHELL.md](SHELL.md).

**Done when:** shell + form child + util; one **pipeline** for edit load; **draft** is `linkedSignal`; submit via `Subject` + `exhaustMap`.

### Route-driven load (no shared form child)

Follow [RECIPES.md](RECIPES.md) — query-driven GET, pagination, or submit-only page.

**Done when:** one **pipeline** per load; typed `initialValue` on every `toSignal`.

### SCSS or layout

Read the escalation ladder in workspace `AGENTS.md`, then [STYLES.md](STYLES.md).

**Done when:** new CSS lives in owning `*.component.scss` or the shared UI library — zero new page rules in `styles.scss`.

## Dates

| Context | Use |
|---------|-----|
| Editable field | Shared date-input component — model is ISO `yyyy-MM-dd` or `''` |
| Read-only table / label | Locale date pipe (path in `AGENTS.md`) |
| API payload | `field \|\| null` — no hand-rolled `toIso` / `fromIso` in form utils |

## Verify

- [ ] Zero `.subscribe(` in component `.ts`.
- [ ] Every `toSignal` has typed `initialValue`.
- [ ] Route-driven loads: one **pipeline**, no snapshot.
- [ ] Create/edit: **shell** + form child + util; **draft** is `linkedSignal`.
- [ ] Dates: shared date-input in forms; locale pipe in read-only templates.
- [ ] Locale strings per `AGENTS.md`; notification service on mutation success/error.
- [ ] New CSS in owning `*.component.scss` or shared UI library.
- [ ] Zero new `::ng-deep` / `ViewEncapsulation.None`.

**Done when:** every item passes, or legacy code is explicitly out of scope for this change.

## Reach

| Branch | File |
|--------|------|
| Create/edit **shell** | [SHELL.md](SHELL.md) |
| Query load, pagination, submit-only | [RECIPES.md](RECIPES.md) |
| Encapsulated SCSS placement | [STYLES.md](STYLES.md) |
| Legacy traps when migrating | [ANTI-PATTERNS.md](ANTI-PATTERNS.md) |
