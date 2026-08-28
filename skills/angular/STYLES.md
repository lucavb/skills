# Styles

Full escalation ladder: workspace **`AGENTS.md`**. Read it before adding or moving SCSS.

| Need | Where |
|------|-------|
| Page grid, toolbar, lede | `pages/.../*.component.scss` — block naming per `AGENTS.md` |
| Reusable component look | Shared UI library package `*.scss` — add `input()` if missing |
| Shell navbar slots | `app.scss` — layout on library component hosts + design-token CSS vars |
| Stretch a button in a column | Parent SCSS: host selector `{ display: flex; width: 100%; }` — host layout, not `::ng-deep` into library internals |
| Context theming (drawer vs desktop) | Ancestor sets design-token overrides; library reads with fallbacks |

**Done when:** every new rule sits at the lowest rung on the ladder; page SCSS owns page layout; library SCSS owns reusable look.
