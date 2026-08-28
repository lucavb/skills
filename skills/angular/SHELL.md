# Shell (create / edit forms)

A **shell** route component owns load + submit. A **form child** owns fields + `linkedSignal` **draft**. A **util** owns types and pure mappers.

Find a canonical feature folder in workspace `AGENTS.md` — typically `*-edit`, `*-new`, `*-form.*`, `*-form.util.ts`.

## 1. Util — types and pure functions

- `EntityForm`, `EntityDto`, `emptyEntityForm()`, `dtoToForm()`, `formToPayload()`.
- Empty defaults: `as const satisfies FormType` — not a loose return annotation.
- Discriminated unions: `as const satisfies LoadState` — not `as LoadState`.
- Date fields in the form model are **ISO `yyyy-MM-dd` strings** (or `''`). No locale display format in the model.

**Done when:** util exports types, empty factory, and bidirectional mappers with no HTTP or route imports.

## 2. Form child — draft via `linkedSignal`

```typescript
readonly initialForm = input.required<EntityForm>();
readonly submitted = output<EntityForm>();

protected readonly form = linkedSignal({
  source: () => this.initialForm(),
  computation: (source) => ({ ...source }),
});

protected onSubmit(): void {
  this.submitted.emit({ ...this.form() });
}
```

- `[(ngModel)]` binds to `form().field` inside the child only.
- Footer: shared form-footer component (`cancelLink`, `submitLabel`, `loading`) — styles live in the UI library.
- Dates: **shared date-input component** — not a text input with manual conversion.

**Done when:** child has no HTTP, no route, no `Object.assign`, no `formHydratedAt` hack.

## 3. Edit shell — one `loadState` pipeline

`paramMap` → `map(id)` → `switchMap` → GET. **Single** `toSignal` — no `route.snapshot`, no `id` signal fed back through `toObservable`.

```typescript
type LoadState =
  | { status: 'loading' }
  | { status: 'ok'; id: number; form: EntityForm }
  | { status: 'error' };

protected readonly loadState = toSignal(
  this.route.paramMap.pipe(
    map((params) => Number(params.get('id') ?? '0')),
    switchMap((id) => {
      if (!id) return of({ status: 'error' } as const satisfies LoadState);
      return this.http.get<EntityDto>(`/api/entities/${id}`).pipe(
        map(
          (data) =>
            ({
              status: 'ok',
              id,
              form: entityDtoToForm(data),
            }) as const satisfies LoadState,
        ),
        catchError(() => { /* notify + navigate */ return of({ status: 'error' } as const satisfies LoadState); }),
        startWith({ status: 'loading' } as const satisfies LoadState),
      );
    }),
  ),
  { initialValue: { status: 'loading' } as const satisfies LoadState },
);

protected readonly loaded = computed(() => {
  const state = this.loadState();
  return state.status === 'ok' ? state : null;
});
```

Template: mount the form only when `loaded()` is non-null — `@if (loaded(); as state) { <app-entity-form [initialForm]="state.form" … /> }`.

Immutable `form` in `loadState` flows into `initialForm`; the child's `linkedSignal` owns the editable **draft**. Route `:id` changes cancel the in-flight request, emit `loading`, then a fresh `ok` + form.

**Done when:** one **pipeline** from `paramMap` to loaded form; template gated on `loaded()`.

## 4. Create shell

- `protected readonly initialForm = emptyEntityForm()` (stable reference).
- Same form child; POST on `(submitted)`.

**Done when:** create shell reuses the form child with a stable `initialForm` reference.

## 5. Submit

```typescript
private readonly submit$ = new Subject<EntityForm>();
// exhaustMap: read loadState().id for PUT URL, entityFormToPayload(form) for body
submit(form: EntityForm): void {
  this.submit$.next(form);
}
```

**Done when:** mutations flow through `Subject` + `exhaustMap` → `toSignal` with `SUBMIT_STATE`; project notification service on success/error.
