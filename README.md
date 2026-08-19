# Agent Skills

[![skills.sh](https://skills.sh/b/lucavb/skills)](https://skills.sh/lucavb/skills)

Cross-agent skills for Cursor, Claude Code, and other coding agents. Install with [skills.sh](https://skills.sh) (`npx skills add`).

## Quick install

```bash
# List available skills
npx skills add lucavb/skills --list

# Install all skills (global, common agents)
npx skills add lucavb/skills --skill '*' \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y

# Install one skill (review skills need review-core too — see below)
npx skills add lucavb/skills --skill ticket-to-pr-pipeline
```

## Which skill?

| You want to… | Install |
|--------------|---------|
| Fix a Jira ticket end-to-end → PR | `review-core` + `ticket-to-pr-pipeline` |
| Review an open PR or local diff (including "is there a cleaner way?") | `review-core` + `review-tribunal` |
| Run the blind-review engine directly on a local branch | `review-core` |
| Stop deferring discovery — explore before presenting a plan | `discover-before-planning` |
| GitHub URLs / explore remote repo source | `gh-fetch` |
| Estimate Jira story points from done-ticket benchmarks | `story-point-estimation` |
| Surface doubts and blind spots before accepting agent work | `closing-ritual` |

```bash
# Ticket → PR
npx skills add lucavb/skills --skill review-core \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y
npx skills add lucavb/skills --skill ticket-to-pr-pipeline \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y

# PR or local-diff tribunal
npx skills add lucavb/skills --skill review-core \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y
npx skills add lucavb/skills --skill review-tribunal \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y
```

## Skills

| Skill | Description | Docs |
|-------|-------------|------|
| `conversation-handoff` | Fork a drifting topic or reset a compacted conversation into a copy-pasteable handoff | [README](skills/conversation-handoff/README.md) |
| `discover-before-planning` | Do discovery during planning — close open questions before presenting a plan | [README](skills/discover-before-planning/README.md) |
| `review-core` | Shared blind review, tribunal, and adversarial validation engine | [README](skills/review-core/README.md) |
| `ticket-to-pr-pipeline` | End-to-end Jira ticket flow with plan, build, review-core, and PR | [README](skills/ticket-to-pr-pipeline/README.md) |
| `review-tribunal` | PR or local-diff review — intake, review-core, target-specific delivery | [README](skills/review-tribunal/README.md) |
| `refining-jira-tickets` | Pre-scrum refinement — trace codebase, spot plot holes, comment on Jira | [README](skills/refining-jira-tickets/README.md) |
| `story-point-estimation` | Size Jira tickets by benchmarking done work with SP set | [README](skills/story-point-estimation/README.md) |
| `atlassian-jira-adf-formatting` | ADF round-trip for Jira story tables with bulleted Requirements/AC cells | [README](skills/atlassian-jira-adf-formatting/README.md) |
| `writing-commit-messages` | Commit messages that explain the why, matching each repo's style | [README](skills/writing-commit-messages/README.md) |
| `plainspoken-writing` | Evidence-first editing pass for direct, specific, proportionate prose | [README](skills/plainspoken-writing/README.md) |
| `gh-fetch` | GitHub URLs via `gh` CLI; checkout when multiple file accesses foreseen | [README](skills/gh-fetch/README.md) |
| `closing-ritual` | Closing ritual — evidence-grounded self-report of doubts, blind spots, unverified claims | [README](skills/closing-ritual/README.md) |

### Review skill dependencies

| Skill | Install with |
|-------|--------------|
| `review-tribunal` | `review-core` |
| `ticket-to-pr-pipeline` | `review-core` |

## Options

```bash
# Global install for common agents (recommended)
npx skills add lucavb/skills --skill <name> \
  -a cursor -a claude-code -a codex -a opencode -a zed -g -y

# Global install for Cursor only
npx skills add lucavb/skills --skill <name> -a cursor -g -y

# Project install, target a specific agent
npx skills add lucavb/skills --skill <name> -a cursor -y

# Check for updates
npx skills check
npx skills update
```

### Global install notes

- Prefer `-a` with global installs (`-g -y`). Bare `-g -y` without `-a` can show `Failed to install 1` for PromptScript even when the skill installed correctly into `~/.agents/skills/`.
- PromptScript is project-only in the `skills` CLI. Target agents explicitly, or ignore the footer if the skill path exists.
- `review-tribunal` and `ticket-to-pr-pipeline` require `review-core` — install both.

## Prerequisites

- **Jira skills** (`refining-jira-tickets`, `story-point-estimation`, `atlassian-jira-adf-formatting`, `ticket-to-pr-pipeline`): [Atlassian MCP](https://github.com/atlassian/atlassian-mcp-server) configured in your agent.
- **review-core**, **ticket-to-pr-pipeline**, **review-tribunal**: agents that support subagent/task spawning (Cursor, Claude Code).
- **ticket-to-pr-pipeline**: GitHub CLI (`gh`) for PR creation.
- **review-tribunal**: GitHub CLI (`gh`) only for PR intake and posting; local-diff reviews use Git.
- **gh-fetch**: GitHub CLI (`gh`) authenticated for fetch and clone.

## License

MIT — see [LICENSE](LICENSE).
