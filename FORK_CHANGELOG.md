# Fork changelog

Releases of [gdraganic/oh-my-openagent](https://github.com/gdraganic/oh-my-openagent) (continued from [rubimpassos/oh-my-openagent](https://github.com/rubimpassos/oh-my-openagent)), the OpenCode 2 line of Oh-My-OpenAgent. Each release is built from `main` (upstream plus this fork's OpenCode 2 work) and tagged `v<upstream version>-fork.<n>`; the `releases` branch always points at the latest one. Install it in `opencode.json`:

```json
{ "plugins": ["oh-my-opencode@git+https://github.com/gdraganic/oh-my-openagent.git#releases"] }
```

`#releases` follows new releases: OpenCode flags the plugin as outdated when the branch moves, and Update in OpenChamber's Settings → Plugins installs it. Use a tag (`#v5.0.1-fork.1`) to stay on one version or to roll back. Either way the plugin arrives built, so OpenCode loads it without building anything. Upstream's own changes are in [CHANGELOG.md](CHANGELOG.md).

To release: add a `## [<version>] - YYYY-MM-DD` section here on `main` (with the `Fork-Patch: v2-support` trailer), then run the **Fork release** workflow with that version.

## [5.1.38-fork.1] - 2026-10-19

Rebased on upstream `dev` of 2026-10-19 (492 commits since fork.1): upstream releases 5.1.36, 5.1.37 and 5.1.38. Upstream highlights for the OpenCode edition: `unspecified-low` tries GLM 5.3 before GPT; Sisyphus prompts name GPT-6.1 Sol and GPT-6 Luna correctly; `runtime_fallback` moves on when a Cursor pool is spent; builds move to Bun 1.4.3 (CVE-2026-48618).

Upstream 5.1.36 also made the plugin load on OpenCode 2 (#10439), but only as a notice: agents, tools and hooks stay inactive and it points to OmO Native. The maintainer confirmed on #9389 that full OpenCode 2 support will not come upstream. This fork keeps its full adapter in place of that entry.

### Changes

- Upstream's notice-only OpenCode 2 entry and its "support is limited" toast are replaced by this fork's adapter.
- `@opencode/plugin` updated from 2.0.16 to 2.0.32, matching upstream.

## [5.1.35-fork.1] - 2026-10-17

Rebased on upstream `dev` of 2026-10-17 (769 commits since fork.2): upstream releases 5.1.34 and 5.1.35. Upstream highlights: `oracle`, `momus` and `plan-reviewer` fall back to Argon before the previous pro model; telemetry opt-outs (`OMO_DISABLE_TELEMETRY=1`, `DO_NOT_TRACK`) are checked when events are sent, so turning telemetry off mid-session takes effect. Upstream has paused its own OpenCode V2 work (#9389), so this fork remains the way to run oMo on OpenCode 2.x.

### Fixes

- Service-tier models such as `gpt-6-luna-fast` now reach oMo's model list. OpenCode lists a tier with the same provider API name as its base model, and the adapter merged the two, so explore, librarian and quick fell back to their next model (`claude-haiku-5-5`).
- On a fresh install or with an empty cache, agents no longer resolve to providers that are not connected (explore and librarian on `kimi-for-coding`). The adapter builds the connected-providers cache before agents pick their models.
- The fork's `OMO_CONFIG_DIR` startup patch was updated for upstream's new migration result field.

## [5.1.33-fork.2] - 2026-10-15

Rebased on upstream `dev` of 2026-10-15 (225 commits since fork.1, still upstream 5.1.33).

### Fixes

- Under the OpenCode background service (`opencode serve --service`, which OpenChamber uses), the adapter's own HTTP requests now reach the right server with the right password. It took the first listening port on the whole machine instead of its own, and it sent the password inherited from the launching client, which the service rejects. Every request failed quietly, so delegated tasks lost their configured `-fast` model (explore ran on its fallback), and session listing and goal metadata sync did not work.

### Tests

- Regression tests from @mradwankhalil (SwarmStorm/oh-my-openagent#1): a messages transform that inserts a message, such as the team-mode status injector, keeps every other message's content in place and leaves tool messages with only tool results. This fork's write-back already does that; the tests guard it.

## [5.1.33-fork.1] - 2026-10-14

**Rebased on upstream 5.1.33.** The OpenCode 2 line was built on upstream from 2026-09-28; it now carries every upstream change since, including the security fixes: secret redaction across memory injection and commits, credentials preserved across uncertain token refreshes, escaped untrusted gateway rule text, a sandboxed child memory home, and builtin categories that no longer route to gateways such as OpenRouter that you never configured.

### Fixes

- Delegated tasks run on the model you configured again. OpenCode 2 lists the -fast, -pro and -flex service tiers only through the server, so upstream's stricter task model selection treated a configured `openai/gpt-5.6-luna-fast` as unreachable and switched to its fallback. The provider list now includes those tiers.
- A fallback model no longer fails on a reasoning level it does not offer. OpenCode 2 rejects an unsupported variant instead of ignoring it; a task that fell back from explore's `low` to `claude-haiku-4-5` (which offers only `high` and `max`) failed and left the parent task waiting. The variant is now dropped for that model.
- The "Continue." sent after a manual compaction goes through the shared prompt gate, so it cannot collide with todo or goal continuations on the same idle.
- `lsof` runs through upstream's shared spawn shim instead of a raw Bun global.

### Changed

- The fork syncs with upstream `dev` directly instead of the head of upstream PR #9016, which was pinned to the upstream it was opened against.
- Upstream workflows added since the previous base are not carried in the fork.

## [5.0.1-fork.7] - 2026-10-14

### Fixes

- On a headless Linux server, OMO no longer builds desktop notifications nobody can see. Building one read the whole session history at the end of every turn, which stalled OpenCode in sessions with image attachments. OpenChamber's notifications are unaffected.

## [5.0.1-fork.6] - 2026-10-14

### Fixes

- The end of every turn no longer stalls OpenCode in sessions with image attachments. The todo continuation read the whole session history before checking for pending todos; it now reads the history only when there are todos to continue.

## [5.0.1-fork.5] - 2026-10-14

### Fixes

- The fork.4 fix now also covers sessions that never switched agents, such as sessions created through the API, which still read their whole history on every tool call.

## [5.0.1-fork.4] - 2026-10-14

### Fixes

- Tool calls no longer stall OpenCode in sessions with image attachments. Atlas and the Prometheus guard read the whole session history on every tool call to learn which agent was running, and OpenCode revalidates every stored image on each read. They now read the session's current agent.

## [5.0.1-fork.3] - 2026-10-14

### Fixes

- The sidebar no longer keeps a CPU core busy in sessions with image attachments. It read each active session's whole history every two seconds just to show the agent's name, and OpenCode revalidates every stored image on each read. It now reads the session's current agent instead.

## [5.0.1-fork.2] - 2026-10-13

### Fixes

- Pause and Resume on an OMO goal in OpenChamber now take effect. Pause no longer flips back to active or lets the next continuation through, and Resume continues an idle session right away instead of waiting for an event that never came.

## [5.0.1-fork.1] - 2026-10-11

**The first release of the OpenCode 2 line.** Until now the fork ran from a checkout built on the machine. It now ships as built releases that OpenCode installs and updates from the repository.

### New

- Runs on OpenCode 2: delegation, background tasks, team mode and every OMO tool work, and the tools are offered to the model directly instead of through Code Mode.
- Publishes its state for clients such as OpenChamber in `.omo/v2-state`: todos, background tasks with every retry attempt, team runs with unread messages, Atlas plans, goals, model health and the config files it loads.
- Cancel and retry background tasks from a client: a retry runs on a model of the category that is not failing.
- `/goal` tracks tokens and time, waits for its background tasks, and stops at a token budget or a turn cap. In OpenChamber it shows and is controlled with OpenChamber's own goal UI.
- Native notifications in OpenChamber when a background task fails, a chat's tasks all finish, a plan completes or a goal settles.
- `browser_automation_engine.provider: "external"` leaves browsing to another plugin, such as OpenChamber's browser.
- `OMO_CONFIG_DIR` points OMO at its own config folder.

### Fixes

- Tool results reach the model as text, not as a JSON dump of their parts, and tool metadata no longer breaks recording a background launch.
- Projected tools carry their real parameter schema, so `task` runs in the background when asked.
- `todowrite` returns the saved list, like it did on OpenCode 1.
- A goal is no longer replaced by the next ordinary message, and its loop keeps going after short turns.
