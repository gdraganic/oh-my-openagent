export declare function getPluginSandboxRoot(cacheDir: string): string;
/**
 * The spec OpenCode installs for a config plugin entry. A bare package name
 * becomes `<name>@latest`, mirroring OpenCode's own plugin-target resolution.
 * Returns null for entries that are not this plugin (`file:` dev entries and
 * third-party plugins).
 */
export declare function toPluginSandboxSpec(entry: string): string | null;
export declare function getPluginSandboxDir(cacheDir: string, entry: string): string | null;
/**
 * Guards every removal: true only for a direct child of
 * `<cacheDir>/packages` named after one of this plugin's package specs.
 * A plugin loaded from anywhere else — a project `node_modules`, a global
 * install, a linked checkout — must never be deleted, so a caller that walked
 * up from `import.meta.url` has to pass its result through this first.
 * Paths are canonicalized because `$TMPDIR`-style symlinks make the raw
 * strings disagree on macOS.
 */
export declare function isPluginSandboxDir(dir: string, cacheDir: string): boolean;
/**
 * Removes the whole sandbox directory, not just `node_modules/<package>`:
 * the sandbox's own `package.json`/lockfile can re-pin the previous version
 * when OpenCode reinstalls the spec.
 *
 * The directory is renamed aside before it is deleted. `Npm.add()` only checks
 * that `node_modules/<package>` exists, so a recursive delete that fails part
 * way (EBUSY/EPERM on a file Windows holds open, EACCES) or that races an
 * OpenCode start would leave a half-deleted copy OpenCode then loads. A rename
 * is atomic: it either fails with the sandbox intact or the spec path is gone.
 */
export declare function removePluginSandbox(dir: string, cacheDir: string): boolean;
/**
 * Requests a refresh of our sandbox; the next exit handler that sees it
 * removes the sandbox. The marker records the requesting pid and, once an
 * exit handler could not act on it, why - so the next start can say so
 * instead of promising "restart to apply" forever.
 */
export declare function markPluginSandboxStale(dir: string, cacheDir: string, reason?: string, pid?: number): boolean;
/**
 * Why a refresh requested before this process started was not applied, or
 * null when there is nothing to report: no request, a request from this
 * process, or one from another window that is still running and will apply
 * it when it exits.
 */
export declare function describeUnappliedPluginSandboxRefresh(dir: string, pid?: number): string | null;
export declare function isPluginSandboxMarkedStale(dir: string): boolean;
export declare function acquirePluginSandboxLease(dir: string, pid?: number): void;
export declare function releasePluginSandboxLease(dir: string, pid?: number): void;
/**
 * True while another live process holds a lease on the sandbox. Leases of
 * dead processes (a killed session never releases its own) are pruned. A
 * reused pid only postpones the refresh, it never removes a sandbox in use.
 */
export declare function hasOtherLivePluginSandboxLease(dir: string, pid?: number): boolean;
