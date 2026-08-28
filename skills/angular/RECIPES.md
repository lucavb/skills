# Other recipes

## Query-driven GET

`queryParamMap` → `switchMap` → GET — same **pipeline** rule as edit shells. See a canonical example in workspace `AGENTS.md`.

**Done when:** query params and HTTP share one `toSignal` chain with typed `initialValue`.

## Writable signal triggers refetch

`toObservable(selectedId)` when **user input** changes dependent options. Legitimate; different from route params already in the same **pipeline**.

**Done when:** refetch is driven by user-editable signal, not by re-emitting route params.

## Paginated index

`combineLatest` + `toObservable(filterSignals)` + `switchMap` → `toSignal<Page<T>>`. One reactive **pipeline** replaces imperative `load()` + subscribe.

**Done when:** page index and filters refetch through `switchMap`; no subscribe.

## Submit-only page (no shared form child)

`Subject<void>` + `exhaustMap` + `SUBMIT_STATE`. See a canonical example in workspace `AGENTS.md`.

**Done when:** submit lifecycle is a `toSignal` over `exhaustMap`; template reads signal state with `()`.
