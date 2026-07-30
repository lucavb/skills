# Agent Skills

[![skills.sh](https://skills.sh/b/lucavb/skills)](https://skills.sh/lucavb/skills)

Cross-agent skills for Cursor, Claude Code, and other coding agents. Install with [skills.sh](https://skills.sh) (`npx skills add`).

## Quick install

```bash
# List available skills
npx skills add lucavb/skills --list

# Install all skills
npx skills add lucavb/skills --skill '*' -g -y

# Install one skill (review skills need review-core too — see below)
npx skills add lucavb/skills --skill ticket-to-pr-pipeline
```

## Which skill?

| You want to… | Install |
|--------------|---------|
| Fix a Jira ticket end-to-end → PR | `review-core` + `ticket-to-pr-pipeline` |
| Review an open PR (including "is there a cleaner way?") | `review-core` + `review-tribunal` |
| Blind-review a local branch mid-work | `review-core` |
| Stop deferring discovery — explore before presenting a plan | `discover-before-planning` |

```bash
# Ticket → PR
npx skills add lucavb/skills --skill review-core -g -y
npx skills add lucavb/skills --skill ticket-to-pr-pipeline -g -y

# PR review
npx skills add lucavb/skills --skill review-core -g -y
npx skills add lucavb/skills --skill review-tribunal -g -y
```

## Skills

| Skill | Description | Docs |
|-------|-------------|------|
| `agent-handover` | Structured handover docs so the next agent can fix, not re-investigate | [README](skills/agent-handover/README.md) |
| `discover-before-planning` | Do discovery during planning — close open questions before presenting a plan | [README](skills/discover-before-planning/README.md) |
| `review-core` | Shared blind review, tribunal, adversarial validation (dependency of review skills) | [README](skills/review-core/README.md) |
| `ticket-to-pr-pipeline` | End-to-end Jira ticket flow with plan, build, review-core, and PR | [README](skills/ticket-to-pr-pipeline/README.md) |
| `review-tribunal` | Open PR review — intake, review-core, interactive GitHub comments | [README](skills/review-tribunal/README.md) |
| `refining-jira-tickets` | Pre-scrum refinement — trace codebase, spot plot holes, comment on Jira | [README](skills/refining-jira-tickets/README.md) |
| `atlassian-jira-adf-formatting` | ADF round-trip for Jira story tables with bulleted Requirements/AC cells | [README](skills/atlassian-jira-adf-formatting/README.md) |
| `writing-commit-messages` | Commit messages that explain the why, matching each repo's style | [README](skills/writing-commit-messages/README.md) |

### Review skill dependencies

| Skill | Install with |
|-------|--------------|
| `review-tribunal` | `review-core` |
| `ticket-to-pr-pipeline` | `review-core` |

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
- **review-core**, **ticket-to-pr-pipeline**, **review-tribunal**: agents that support subagent/task spawning (Cursor, Claude Code).
- **ticket-to-pr-pipeline**, **review-tribunal**: GitHub CLI (`gh`) for PR creation and review.

## License

MIT — see [LICENSE](LICENSE).
