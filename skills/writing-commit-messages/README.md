# writing-commit-messages

## Problem

Agents write commit subjects that restate the diff ("add validation to form", "update config") instead of explaining **why** the change was necessary. Reviewers see what changed but not the reasoning, constraints, or trade-offs.

## What it does

Guides the agent to read the target repo's recent commit history first, match its conventions (type prefixes, scope, body style), and write messages where the body carries motivation the diff cannot — problem context, why this approach, what was deliberately left out.

## When to install

Install when agents write commits for you and you want messages that earn their place in `git log`, not just describe the patch.

```bash
npx skills add lucavb/skills --skill writing-commit-messages
```

## Prerequisites

None. Works with any agent that can run `git log` and `git commit`.
