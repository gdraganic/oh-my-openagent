/**
 * Makes "restart to apply" true for a plugin running from an OpenCode-managed
 * sandbox.
 *
 * OpenCode's `Npm.add()` serves the plugin from `<cache>/packages/<spec>/` and
 * skips resolution entirely while that sandbox exists, so a restart alone
 * reloads the same old version forever. Removing the sandbox is the only way
 * to make the next start install the channel's current version.
 *
 * Removal waits for process exit because the live session still reads from
 * that directory — bundled skills, the `./tui` export, provisioned binaries
 * and any lazily imported chunk all resolve inside it.
 *
 * Detection and removal run in different threads. In the TUI, OpenCode runs
 * the server plugin (and so this checker) inside a Worker it stops with
 * `worker.terminate()`, and a terminated Worker never emits `exit`. Only the
 * main thread, where the TUI plugin (`./tui`) lives, runs exit handlers. So the
 * checker records the request as a marker file in the sandbox, and every
 * plugin entry point loaded from a sandbox (server and TUI) registers the
 * exit handler that acts on it. A process that dies from a signal runs no
 * handler; the marker stays and the next exit applies it.
 *
 * Every OpenCode window shares the one cache, so tracking also takes a
 * per-process lease on the sandbox, and the exit handler leaves the sandbox
 * (and the request) in place while another live process holds one: the last
 * OpenCode process to exit applies the refresh.
 */
export interface SandboxRefreshDeps {
    /** Registers a callback for process exit. Defaults to `process.once("exit")`. */
    onExit?: (callback: () => void) => void;
    /** The OpenCode cache root that must contain the sandbox. */
    cacheDir?: string;
    /** The pid the lease is taken for. Defaults to `process.pid`. */
    pid?: number;
}
/**
 * The OpenCode plugin sandbox the module at `moduleUrl` was loaded from, or
 * null for any other layout (project or global install, linked checkout,
 * source tree).
 */
export declare function getLoadedPluginSandboxDir(moduleUrl: string, cacheDir?: string): string | null;
/** Registers the exit handler that removes the sandbox if a refresh was requested. */
export declare function trackPluginSandbox(sandboxDir: string, deps?: SandboxRefreshDeps): boolean;
/** Entry-point helper for the server and TUI plugins: track the sandbox this bundle runs from, if any. */
export declare function trackLoadedPluginSandbox(moduleUrl?: string): void;
/**
 * Requests the exit-time refresh of `sandboxDir`. Returns why an earlier
 * request was not applied (see `describeUnappliedPluginSandboxRefresh`), so the
 * caller can tell the user a plain restart will not help; null otherwise.
 */
export declare function scheduleOpenCodeSandboxRefreshOnExit(sandboxDir: string, deps?: SandboxRefreshDeps): string | null;
