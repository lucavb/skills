# ADF patterns for Jira story tables

## Document root

```json
{
  "type": "doc",
  "version": 1,
  "content": [{ "type": "table", "attrs": { "isNumberColumnEnabled": false, "layout": "default" }, "content": [] }]
}
```

## Table row — label + prose (Story)

```json
{
  "type": "tableRow",
  "content": [
    {
      "type": "tableCell",
      "attrs": {},
      "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Story" }] }]
    },
    {
      "type": "tableCell",
      "attrs": {},
      "content": [{
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "As a … I want … so that …" }
        ]
      }]
    }
  ]
}
```

## Table row — label + empty (Figma Link)

```json
{
  "type": "tableCell",
  "attrs": {},
  "content": [{ "type": "paragraph" }]
}
```

## Table row — label + bullet list (Requirements / AC)

```json
{
  "type": "tableRow",
  "content": [
    {
      "type": "tableCell",
      "attrs": {},
      "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Requirements" }] }]
    },
    {
      "type": "tableCell",
      "attrs": {},
      "content": [{
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [{
              "type": "paragraph",
              "content": [{ "type": "text", "text": "First requirement." }]
            }]
          },
          {
            "type": "listItem",
            "content": [{
              "type": "paragraph",
              "content": [
                { "type": "text", "text": "Use field " },
                { "type": "text", "text": "Account.SAPID__c", "marks": [{ "type": "code" }] },
                { "type": "text", "text": " (example: 758658)." }
              ]
            }]
          }
        ]
      }]
    }
  ]
}
```

## Inline code mark

Use for API names, field names, and identifiers with underscores:

```json
{ "type": "text", "text": "SAPID__c", "marks": [{ "type": "code" }] }
```

## MCP call shapes

### editJiraIssue

```json
{
  "cloudId": "81cd74fd-34d7-46ea-8689-66995d1fb2d9",
  "issueIdOrKey": "PROJ-123",
  "contentFormat": "adf",
  "fields": {
    "description": { "type": "doc", "version": 1, "content": ["…"] }
  }
}
```

### createJiraIssue

```json
{
  "cloudId": "…",
  "projectKey": "PROJ",
  "issueTypeName": "Story",
  "summary": "[Feature] Short title",
  "contentFormat": "adf",
  "description": { "type": "doc", "version": 1, "content": ["…"] }
}
```

Note: `createJiraIssue` takes `description` at top level; `editJiraIssue` nests it under `fields`.

### Verify

```json
{
  "cloudId": "…",
  "issueIdOrKey": "PROJ-123",
  "fields": ["description"],
  "responseContentFormat": "adf"
}
```

Inspect `fields.description.content[0].content` — each Requirements/AC row's second cell should have `"type": "bulletList"` and N `"type": "listItem"` entries.

## Authoring tips

1. **Save ADF to a file** (e.g. `.cursor/issue-KEY-description.json`) and compact with `JSON.stringify` before MCP calls — easier to diff and retry.
2. **Clone from a good ticket**: fetch ADF from a reference story, replace text nodes, keep structure.
3. **Do not nest bulletList inside listItem** unless you need sub-bullets — some MCP clients reject deep nesting.
4. **Markdown is fine** for comments and simple descriptions without table-in-table lists.

## What UI export looks like vs ADF truth

Jira markdown export of a UI-edited ticket may show ` -  ` inline separators or period-separated sentences. That export is lossy. The stored ADF still has real `bulletList` nodes. Match the **ADF**, not the markdown export, when programmatically cloning format.
