/**
 * Clears OpenCode's plugin sandbox for the spec(s) the installer just wrote.
 *
 * OpenCode serves the plugin from `<cache>/packages/<spec>/` and its
 * `Npm.add()` never re-resolves the tag while that sandbox exists, so a user
 * who re-runs the installer to upgrade would keep loading the version cached
 * there. The next OpenCode start reinstalls the spec at its current version.
 *
 * The installer is often run while OpenCode is open (from another terminal, or
 * by the agent itself), and a live session reads from the sandbox lazily. A
 * sandbox another process holds a lease on is therefore only marked for
 * refresh; the last OpenCode process to exit removes it.
 *
 * Only the specs the config actually loads are touched, so an unrelated
 * channel a user keeps around (`@beta` next to `@latest`) is left alone.
 */
export interface RefreshOpenCodePluginSandboxesOptions {
    readonly configDir?: string;
    readonly cacheDir?: string;
}
export interface RefreshOpenCodePluginSandboxesResult {
    readonly removed: readonly string[];
    /** Sandboxes a running OpenCode still uses; they refresh when it exits. */
    readonly deferred: readonly string[];
    /** Sandboxes that could not be removed; the caller must tell the user. */
    readonly failed: readonly {
        readonly dir: string;
        readonly message: string;
    }[];
}
export declare function refreshOpenCodePluginSandboxes(options?: RefreshOpenCodePluginSandboxesOptions): RefreshOpenCodePluginSandboxesResult;
