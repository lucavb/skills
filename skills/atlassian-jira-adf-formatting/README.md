# atlassian-jira-adf-formatting

## Problem

Agents default to markdown when editing Jira descriptions via `editJiraIssue`. That works for plain text and bullets **outside** tables — but markdown **cannot** put bullet lists inside table cells.

Story templates with a Requirements / Acceptance Criteria table and bulleted cells are common. A markdown edit flattens or breaks those cells:

| Approach | Story table with bulleted Requirements/AC |
|----------|-------------------------------------------|
| `contentFormat: "markdown"` | Bullets flatten to plain text or layout breaks |
| `contentFormat: "adf"` | Bullet lists preserved inside `tableCell` nodes |

Without ADF round-trip, agents struggle to produce and edit tables with bullet points correctly.

## What it does

Enforces a **round-trip edit**: fetch full ADF → edit in JSON files → validate with scripts → send complete document via MCP. Includes `validate-adf.js`, `preflight-adf-edit.js`, and reference docs for ADF node patterns.

## When to install

Install when you create or edit Jira stories with table-based templates, fix ticket typos in ADF descriptions, or see flattened Requirements/AC after agent edits.

```bash
npx skills add lucavb/skills --skill atlassian-jira-adf-formatting
```

## Prerequisites

- [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) with `getJiraIssue` and `editJiraIssue`
- Node.js for validation scripts in `scripts/`
