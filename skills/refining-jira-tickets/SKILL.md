---
name: refining-jira-tickets
description: Pre-scrum refinement of Jira stories for engineering readiness. Use when the user asks to refine tickets, review PO stories, spot plot holes, pre-scrum refinement, or leave refinement comments for a product owner on Jira.
---

# Jira ticket refinement

Help the user **refine** stories so engineers can pick them up. Read the ticket, trace the codebase, surface **plot holes** and PO gaps, draft a Jira comment, fix typos on the ticket directly. Goal: the PO learns to write better stories.

All Jira reads and writes go through **Atlassian MCP** (`plugin-atlassian-atlassian`). Read tool schemas before calling.

## Refinement loop (one ticket per pass)

Work tickets in the order the user gives. Do not batch-post comments.

### 1. Ingest

- Fetch the ticket: `getJiraIssue` with `responseContentFormat: "markdown"`. Pull comments and linked issues when sizing cross-ticket conflicts.
- Fetch sibling tickets in the same epic when the user names a set or overlap is likely.

**Done when:** You can state the story, user journey, AC, and out-of-scope in plain language.

### 2. Legwork

Trace the ticket against the codebase before critiquing. Spawn explore agents in parallel when the epic spans multiple areas.

Order: read what the ticket says → trace code → flag **engineering gaps** for the user → surface **PO questions** only when ticket + code still leave genuine product ambiguity.

**Done when:** You know what exists today, what the ticket assumes, and which gaps are PO-owned vs engineering-owned.

### 3. Brief the user

Return a concise summary:

- What the ticket is about (2-4 sentences)
- What is clear and good
- **Plot holes** - AC gaps, contradictions with other tickets, Figma vs ticket mismatches, implementation leaking into requirements, ambiguous journeys
- Engineering notes for the user only (repo paths, missing APIs) - not for the PO comment

See [po-critique.md](references/po-critique.md) for what belongs in PO critique vs what to keep out.

**Done when:** Every plot hole maps to a PO decision or a missing AC, not an implementation preference.

### 4. Draft the PO comment

Write the comment per [comment-voice.md](references/comment-voice.md). Show the full draft to the user. **Do not post until they approve.**

**Done when:** Draft is shown and you are waiting for post / edit / skip.

### 5. Post and patch

On approval:

- Post via `addCommentToJiraIssue` with `contentFormat: "markdown"`.
- Fix obvious typos on the ticket directly (spelling, grammar, copy mismatches with Figma). Do not comment on typos you fixed.

For ticket description edits on story tables, follow the **atlassian-jira-adf-formatting** skill: ADF round-trip (`getJiraIssue` → edit → `editJiraIssue` with `contentFormat: "adf"`). Validate with `node ~/.cursor/skills/atlassian-jira-adf-formatting/scripts/validate-adf.js`. Re-fetch to confirm structure.

Large ADF payloads: write the full `editJiraIssue` arguments to a JSON file, pass the entire parsed object to MCP. If inline args fail, use a subagent to call MCP with the file. Never send a partial ADF - that truncates the description.

**Done when:** Comment is posted (or user skipped) and any ticket typo fixes are verified via `getJiraIssue`.

Then ask whether to continue to the next ticket.

## Branches

| Branch | When | Skill |
|---|---|---|
| Ticket typo / copy fix | Spelling, grammar, Figma copy drift | atlassian-jira-adf-formatting |
| Figma check | Design is source of truth for epic UX | User-Figma MCP or user checks manually |
| Epic-wide pass | User names multiple keys | Run the loop per ticket; note cross-ticket conflicts in each brief |

## Cloud ID

Resolve once per session via `getAccessibleAtlassianResources`, or reuse a known `cloudId` from a ticket already fetched in the conversation.
