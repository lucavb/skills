# Code exploration (tools)

**Use Read, Glob, and the Grep tool for almost all exploration.** This applies to blind critics, tribunal verification, adversarial validation, and any subagent you spawn.

| Goal | Tool |
|------|------|
| Find files by path or name | **Glob** |
| Search file contents | **Grep** |
| Open a file you already know | **Read** |

**Reserve Shell for things builtins cannot do** — running tests, `git`, `gh`, installs, builds. **Not** for routine `find`, `rg`, or `grep`.

Only fall back to shell search when you need flags or paths the builtin tools cannot handle (e.g. `--no-ignore`, outside the workspace).

**Do not** default to `find .`, `rg`, or `grep` in the terminal when Glob/Grep/Read will do. If you reach for Shell for discovery, stop and use the builtins first.

Paste these rules into every subagent prompt (review, explore, bugbot, or delegated build).
