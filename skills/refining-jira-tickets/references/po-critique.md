# PO critique vs engineering notes

## Flag in the PO comment

| Category | Example |
|---|---|
| AC gaps | Edge case in requirements but not in AC |
| Cross-ticket conflict | 4691 empty state without tabs vs 4695 tabs with (0) |
| Figma vs ticket | Snackbar copy, layout, missing fields on accept screen |
| Implementation in story | `HIDE_COLLABORATION`, storage keys, enum names in requirements |
| Ambiguous journey | Who sees what when; which language drives email copy |
| Untestable AC | Backend-only rules with no visible QA path |

## Keep for the user only (not the PO comment)

| Category | Why |
|---|---|
| Team ownership / repo routing | Answerable without the PO |
| Migrations, refactors, component placement | Engineering decision |
| "Can we technically do X?" when obviously yes | Not a product question |
| Obvious typos | Fix on the ticket directly |

## Figma

Figma often holds epic-wide context a single ticket omits. Check it before posting a design conflict. When Figma is definitive, state what it shows; when unclear, flag for the user to verify before posting.
