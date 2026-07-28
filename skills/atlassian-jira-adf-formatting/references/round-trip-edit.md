# Round-trip edit (failure modes)

## Atomic overwrite

`editJiraIssue` with `fields.description` **replaces the entire description**. Jira does not merge. Any payload missing rows, cells, or nested bullets **deletes** that content from the live ticket.

Observed failure: a truncated MCP call sent only the Story row and one AC line. The ticket lost User journey, Requirements, Out of Scope, and five AC bullets.

## Inline MCP payloads

`CallMcpTool` arguments are JSON. Hand-typing or pasting large ADF trees inline causes:

| Symptom | Cause |
|---|---|
| `Failed to parse arguments` at ~10–13k chars | Truncated or malformed inline JSON |
| Ticket shows only first rows | Partial ADF object sent (not a Jira bug) |
| `editJiraIssue` succeeds but content wrong | Payload valid JSON but incomplete doc |

**Rule:** never construct the ADF tree inside the `CallMcpTool` invocation. Build it in a file, validate, then load the finished payload file.

## File layout

For issue `YEUPSD-4693`:

```
agent-tools/
  yeupsd-4693-desc-backup.json    # getJiraIssue ADF, untouched
  yeupsd-4693-desc-edited.json    # backup + targeted text-node edits
  yeupsd-4693-edit-payload.json   # build-edit-payload.js output
```

## MCP call pattern

1. Shell: `node build-edit-payload.js YEUPSD-4693 agent-tools/yeupsd-4693-desc-edited.json`
2. Shell: `node preflight-adf-edit.js agent-tools/yeupsd-4693-desc-backup.json agent-tools/yeupsd-4693-desc-edited.json`
3. `CallMcpTool` → `editJiraIssue` on `plugin-atlassian-atlassian`
4. Pass `arguments` as the **parsed object** from the payload file (`require(path)` in node to verify first)
5. If inline passing fails, delegate to a subagent whose only job is loading the file and calling MCP

## Text-node edits only

For typo fixes, walk the backup ADF and change `text` on matching nodes. Do not rebuild the table from markdown or from memory. Do not send a subset of rows.

## Post-edit verification

`getJiraIssue` with `responseContentFormat: "markdown"` — confirm section labels present:

- Story, User journey, Requirements, Out of Scope, Acceptance Criteria, Dependencies

Count AC bullets in markdown. If any section is missing, restore immediately from `*-desc-backup.json` via full round-trip (do not attempt another partial fix).
