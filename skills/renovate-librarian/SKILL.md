---
name: renovate-librarian
description: Work through Renovate dashboards, branches, and dependency updates, including consumer impact and per-update verification.
---

# Renovate librarian

Maintain a repository's Renovate dependency queue. Follow the user's exclusions, release decisions, required checks, and Git instructions throughout the run.

## Inventory

1. Inspect the current branch, working tree, package manager, repository instructions, and validation commands. Preserve existing work and note anything that changes project discovery or validation. Run the required checks as a baseline; investigate failures before attributing them to an update.
2. Discover and read the entire Renovate dashboard, open Renovate PRs and their branches. Use GitHub MCP when available; fall back to another authorized read-only GitHub interface if needed. Record each proposal's package, current and target versions, group, branch/commit, status, and whether it is already present locally. The dashboard describes remote state, which may differ from this branch.
3. Keep a ledger covering open PRs, rate-limited proposals, pending checks, blocked or edited branches, and major updates. Distinguish missing branches from unavailable GitHub access. Respect pending checks and Renovate policy; ask before bypassing a gate or changing dashboard controls. Never trigger a rebase of an edited Renovate branch without explicit authorization.
4. Order actionable work by security relevance, scope, and risk: start with small compatible changes, then grouped and major migrations. A minor version can contain breaking changes. Reassess the queue as upstream and local state change.

**Done:** every dashboard entry is accounted for as applied, actionable, excluded, superseded, or blocked, with the reason and source.

## Research and apply

For each update or Renovate group:

1. Inspect the actual commit and diff, current manifests, lockfile, release notes, and relevant upstream migration guidance. Use GitHub MCP and web search when available; prefer official sources. Find relevant consuming repositories and inspect their manifests and usage to gauge migration effort and runtime risks. Consumer upgrades are not by themselves a reason to block an update; distinguish coordinated changes from an unresolved behavior or security decision.
2. Cherry-pick existing Renovate commits when requested, preserving their authorship. If a dashboard proposal has no commit, ask before applying it directly. Align root and affected package dependency and peer declarations, retaining dependency kinds and Renovate groups. Use the repository's package manager to regenerate its lockfile and review the diff; follow its versioning and release policy.
3. Implement and test required compatibility changes. Check published peer contracts and release implications, not only local compilation. Do not silently drop behavior, bypass declared incompatibilities, or invent an authentication or security design; surface decisions that need an owner.
4. Keep each update independently reviewable. Follow repository commit conventions and the applicable commit-message workflow. Ask before changing signing requirements or rewriting history; use command-scoped settings if an unsigned commit is authorized. Do not modify external repositories or dashboard controls without authorization.

**Done:** the intended package and consumer-contract changes are accounted for in the diff, with upstream sources and outstanding coordination recorded.

## Verify each update

Run the user's required quality and test commands for **each** update, not just once for a batch. Discover the repository's install, build, and check commands and how they select affected projects; ensure each run includes the update being tested. Add focused uncached tests, builds, artifact checks, or consumer integration checks for the changed boundary.

Capture commands, results, cache hits, and limitations in the ledger. An affected run, cached task, empty test target, or mocked integration is not evidence of full-workspace or device behavior. A later checkout does not validate an earlier dependency state: use a matching isolated checkout when retrospective validation is needed.

If a check fails or times out, reproduce and compare against the pre-update state; diagnose environment, network, and baseline failures separately from regressions. Use the existing proxy environment when necessary without printing credentials. Apply a narrowly justified fix and rerun the failing and required checks. Stop that update if its result cannot be established; do not report it as passing or proceed past an unresolved regression.

**Done:** every applied update has passing quality and test evidence for its own state, relevant focused checks, or an explicit failure/blocker.

## Close out

Run combined validation over the full change range, review the final diff and Git status, and preserve pre-existing untracked files. Report applied updates with commits and checks; list every remaining proposal with its reason, including user exclusions, pending checks, unsupported combinations, and migrations requiring coordination. Call out untested consumer, browser, native-device, live-service, and release behavior. Do not push, publish, or change other repositories unless requested.
