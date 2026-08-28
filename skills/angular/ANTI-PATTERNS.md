# Anti-patterns

Reach when touching legacy code or reviewing a diff. Each row names the modern target.

| Legacy | Modern |
|--------|--------|
| `route.snapshot.paramMap` | `route.paramMap` inside one `toSignal` **pipeline** |
| `toSignal(paramMap)` then `toObservable(id)` for the same fetch | `paramMap.pipe(map, switchMap, …)` once |
| `ngOnInit` + `http.get().subscribe()` + plain fields | `loadState` + form child, or gate template until loaded |
| `Object.assign(this.form, …)` / `formHydratedAt` bump | `linkedSignal` **draft** from `initialForm` input |
| Text input + locale display format in model + `toIso`/`fromIso` utils | Shared date-input (ISO model) |
| `formatDate()` on index components | Locale date pipe |
| `btn btn-link ms-2` cancel | Shared form-footer component |
| `as LoadState` on literals | `as const satisfies LoadState` |
| `ChangeDetectorRef.markForCheck()` after subscribe | **signals** (migrate off subscribe) |
| `async` pipe | signal + `()` |
| Page layout in `styles.scss` | `*.component.scss` for that page |
| `::ng-deep` / `ViewEncapsulation.None` into library internals | Host layout, design-token vars, or extend shared UI library |
| Styling library internal classes from page SCSS | Component host selectors, or library `input()` |
