# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

This is a **cross-agent skills library** ([lucavb/skills](https://skills.sh/lucavb/skills)), not a deployable application. It is Markdown skill definitions (`skills/*/SKILL.md`, `README.md`, and reference docs) plus a small amount of executable helper code. There is intentionally **no** `package.json`, lockfile, build system, linter config, test framework, or `docker-compose`. Do not add these unless a task explicitly calls for them.

### Runtime dependency

The only runtime dependency is **Node.js** (already present on the VM; validated with v22.x). The helper scripts use only the Node standard library (`fs`, `path`, `process`) — there are **no npm packages to install**, so there is nothing to `npm install`.

### The only runnable code

`skills/atlassian-jira-adf-formatting/scripts/` contains three zero-dependency Node scripts. They are the repo's only executables and are the way to validate the environment end-to-end. Each prints usage and exits `1` when run without args; on failure they exit non-zero (useful in pipelines):

- `validate-adf.js <adf-doc.json>` — structural validation of a Jira ADF description; reports per-section `listItem` counts and warns on flattened-bullet anti-patterns.
- `preflight-adf-edit.js <backup.json> <edited.json>` — guards against partial/destructive round-trips by comparing table rows, list items, text nodes, and byte size.
- `build-edit-payload.js <ISSUE-KEY> <adf-doc.json> [--cloud-id <uuid>] [--out <path>]` — writes a file-backed `editJiraIssue` MCP payload; by default under `agent-tools/` in the current working directory (auto-created).

Run them from any working directory by passing script paths, e.g. `node skills/atlassian-jira-adf-formatting/scripts/validate-adf.js <doc.json>`. See `skills/atlassian-jira-adf-formatting/SKILL.md` for the full round-trip workflow.

### Lint / test / build

There are no lint, automated test, or build commands in this repo. "Testing" a change means running the relevant script(s) above against sample ADF JSON. Full end-to-end use of the Jira/PR skills additionally requires an Atlassian MCP server and the GitHub CLI (`gh`) configured in the consuming agent (see `README.md` Prerequisites) — these are external to this repo and not needed just to run the scripts.
