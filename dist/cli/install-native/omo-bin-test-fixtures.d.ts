export interface GlobalBinFixture {
    readonly root: string;
    readonly binDir: string;
    readonly binPath: string;
    readonly packageDir: string;
}
export interface GlobalBinFixtureOptions {
    readonly root: string;
    readonly packageName: string;
    readonly version: string;
    readonly bins?: readonly string[];
    readonly link?: "symlink" | "script";
}
export declare function createBinFixtureRoot(label: string): string;
/**
 * Lays out a global install the way npm and bun really do it: the package under
 * `lib/node_modules/<name>`, and one entry per bin in `bin/`, either a relative symlink
 * (npm and bun on POSIX) or a launcher script that names the package path (Windows shims and
 * omo-ai's own bun shim).
 */
export declare function writeGlobalPackageBin(options: GlobalBinFixtureOptions): GlobalBinFixture;
/**
 * Lays out the `omo` command the Codex Light installer of a pre-rename release wrote into
 * `~/.local/bin`: a generated shell wrapper, not a package-manager link, that execs the CLI out of
 * `<CODEX_HOME>/plugins/cache/sisyphuslabs/omo/<version>/`. The marker comment is what the Light
 * installer itself matches on when it retires the wrapper.
 */
export declare function writeCodexLightRuntimeWrapper(options: {
    readonly root: string;
    readonly version: string;
    readonly marker?: string;
}): {
    readonly binDir: string;
    readonly binPath: string;
};
