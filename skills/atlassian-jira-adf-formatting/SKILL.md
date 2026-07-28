---
name: atlassian-jira-adf-formatting
description: Round-trip Jira story descriptions via Atlassian MCP ADF — fetch full doc, edit in files, validate, file-backed editJiraIssue. Use when creating or editing Jira stories with table bullets, fixing ticket typos, or when markdown editJiraIssue flattens Requirements/AC cells.
---

# Jira ADF round-trip via Atlassian MCP

`editJiraIssue` **atomically overwrites** the whole description. Partial payloads delete content. Every edit is a **round-trip**: fetch full ADF → edit in files → validate → send full doc via MCP.

Details: [round-trip-edit.md](references/round-trip-edit.md) · node builders: [adf-patterns.md](references/adf-patterns.md)

## Markdown vs ADF

| Description shape | Use |
|---|---|
| Plain text, headings, bullets **outside** tables | `contentFormat: "markdown"` |
| Story table with bulleted Requirements / AC cells | `contentFormat: "adf"` |

Markdown cannot create `bulletList` inside `tableCell`.

## Round-trip edit (required for updates)

1. **Fetch** — `getJiraIssue` with `responseContentFormat: "adf"`, `fields: ["description"]`. Save raw doc to `agent-tools/<key>-desc-backup.json`. **Done when:** file exists and `validate-adf.js` passes.

2. **Edit** — Copy backup to `<key>-desc-edited.json`. Change only targeted `text` nodes (typo fixes). Never rebuild from markdown or memory. **Done when:** diff is limited to intended strings.

3. **Preflight** — Run both validators:
   ```bash
   node scripts/validate-adf.js agent-tools/<key>-desc-edited.json
   node scripts/preflight-adf-edit.js agent-tools/<key>-desc-backup.json agent-tools/<key>-desc-edited.json
   ```
   **Done when:** both exit 0 and listItem counts per section are unchanged (unless intentionally adding bullets).

4. **Payload file** — Never inline ADF in `CallMcpTool`:
   ```bash
   node scripts/build-edit-payload.js <KEY> agent-tools/<key>-desc-edited.json
   ```
   **Done when:** `agent-tools/<key>-edit-payload.json` exists; `node -e "require('./agent-tools/<key>-edit-payload.json')"` parses.

5. **MCP update** — `editJiraIssue` on `plugin-atlassian-atlassian`. Pass `arguments` as the **parsed** payload object from step 4. If inline passing fails, delegate to a subagent that loads the file and calls MCP. **Done when:** MCP returns success.

6. **Verify** — `getJiraIssue` with `responseContentFormat: "markdown"`. **Done when:** all table rows present (Story, Requirements, AC, etc.) and AC bullet count matches backup.

On verification failure: restore from backup via steps 4–5 immediately. Do not send another partial payload.

## Create (new issue)

Build ADF from [adf-patterns.md](references/adf-patterns.md) → `validate-adf.js` → `createJiraIssue` with `contentFormat: "adf"`. Same file-backed rule if the doc is large.

## Story table layout

Left: section label. Right: `paragraph` (Story) or `bulletList` → one `listItem` per bullet (Requirements, AC, Dependencies). Empty cells: empty `paragraph`, not lone `-`.

## Markdown traps

| Pattern | Result |
|---|---|
| `- item` in table cell | Flat text or single item |
| `<br>- item` | One list item with literal `<br>-` |
| Lone `-` in cell | Empty list → `* * *` in UI |
| `__` in field names | Italic parse breaks |

## MCP tools

Read schemas in the MCP descriptor folder before calling.

| Action | Tool | Key params |
|---|---|---|
| Fetch | `getJiraIssue` | `responseContentFormat: "adf"` |
| Update | `editJiraIssue` | `contentFormat: "adf"`, full `fields.description` |
| Create | `createJiraIssue` | `contentFormat: "adf"` |

Cloud ID: `getAccessibleAtlassianResources` or known project UUID.

## Error recovery

| Symptom | Fix |
|---|---|
| Ticket missing rows after edit | Partial payload sent — restore from `*-desc-backup.json` via full round-trip |
| `Failed to parse arguments` | Inline JSON truncated — use payload file + parsed require |
| Bullets as `* * *` | Empty `bulletList` or lone `-` — see adf-patterns |
| All requirements in one bullet | `<br>-` pattern — separate `listItem` per bullet |
