# PO comment voice

Comments teach the PO to write better tickets. Friendly, professional, human - not AI slop.

## Shape

- Open straight into the substance. No greeting ("Hi Abhi").
- No closing filler ("happy to walk through in refinement").
- Use regular hyphen `-` for asides. Not em dash.
- Lead with `A few things to align on:` or similar, then bold topic labels.

## Tone

- Concise questions, not lectures.
- State what you observed, then ask what the PO wants.
- Offer a product-level rephrase when requirements contain implementation (`HIDE_COLLABORATION`, enum names, hint keys) - frame the product intent, note engineering can handle mechanics.
- When Figma and another ticket disagree, cite what Figma shows and ask which wins. Link the conflicting ticket key.

## Example

```
A few things to align on:

**Empty state vs YEUPSD-4695** - Figma for this ticket shows the empty state without tabs when there's nothing active, pending, or expired. 4695 describes tabs with counters (including 0) and per-tab empty states. Can you clarify which one we should build when everything is zero?

**AC scope** - The acceptance criteria only cover the case where the farm has no shared access yet. Should the updated info popup also apply when the farm already has collaborators?
```
