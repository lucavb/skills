# Agent Skills

[![skills](https://img.shields.io/badge/skills-sh-lucavb%2Fskills-blue)](https://skills.sh/lucavb/skills)

Cross-agent skills for Cursor, Claude Code, and other coding agents. Install with [skills.sh](https://skills.sh) (`npx skills add`).

## Quick install

```bash
# List available skills
npx skills add lucavb/skills --list

# Install all skills
npx skills add lucavb/skills --skill '*' -g -y

# Install one skill
npx skills add lucavb/skills --skill ticket-to-pr-pipeline
```

## Skills

| Skill | Description | Docs |
|-------|-------------|------|
| `agent-handover` | Structured handover docs so the next agent can fix, not re-investigate | [README](skills/agent-handover/README.md) |
| `ticket-to-pr-pipeline` | End-to-end Jira ticket flow with blind review and tribunal before PR | [README](skills/ticket-to-pr-pipeline/README.md) |
| `refining-jira-tickets` | Pre-scrum refinement — trace codebase, spot plot holes, comment on Jira | [README](skills/refining-jira-tickets/README.md) |
| `atlassian-jira-adf-formatting` | ADF round-trip for Jira story tables with bulleted Requirements/AC cells | [README](skills/atlassian-jira-adf-formatting/README.md) |
| `writing-commit-messages` | Commit messages that explain the why, matching each repo's style | [README](skills/writing-commit-messages/README.md) |

## Options

```bash
# Global install (all projects)
npx skills add lucavb/skills --skill <name> -g -y

# Target a specific agent
npx skills add lucavb/skills --skill <name> -a cursor -y

# Check for updates
npx skills check
npx skills update
```

## Prerequisites

- **Jira skills** (`refining-jira-tickets`, `atlassian-jira-adf-formatting`, `ticket-to-pr-pipeline`): [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) configured in your agent.
- **ticket-to-pr-pipeline**: GitHub CLI (`gh`) for PR creation.

## License

MIT — see [LICENSE](LICENSE).
