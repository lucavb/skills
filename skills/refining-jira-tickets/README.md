# refining-jira-tickets

## Problem

PO stories arrive with plot holes — missing edge cases, vague acceptance criteria, or conflicts with existing code. Agents guess instead of tracing the codebase and leaving structured refinement comments. Engineers discover gaps during sprint, not refinement.

## What it does

Fetches the Jira ticket via Atlassian MCP, traces the codebase for conflicts and gaps, drafts a refinement comment for the PO, and can fix typos on the ticket directly. Works one ticket per pass with evidence-backed findings.

## When to install

Install when you run pre-scrum refinement, review PO stories for engineering readiness, or want agents to leave refinement comments instead of silently working around bad tickets.

```bash
npx skills add lucavb/skills --skill refining-jira-tickets
```

## Prerequisites

[Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) configured in your agent (`plugin-atlassian-atlassian` or equivalent).
