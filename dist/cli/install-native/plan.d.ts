/** The omo-ai spec on this plugin's channel: `omo-ai@beta` for a prerelease build, bare `omo-ai` for a stable one. */
export declare function nativePackageSpec(pluginVersion?: string): string;
export declare const NATIVE_PACKAGE_SPEC: string;
export declare const NATIVE_SETUP_COMMAND = "omo setup";
export declare const NATIVE_RECOMMENDED_RUNTIME_NOTE = "bun is the recommended runtime for OmO Native; npm works, but bun is what OmO Native is tested on.";
export type NativePackageManager = "bun" | "npm";
export interface NativeInstallPlan {
    readonly packageManager: NativePackageManager;
    readonly command: string;
    readonly args: readonly string[];
}
export declare function resolveNativeInstallPlan(bunAvailable: boolean): NativeInstallPlan;
export declare function formatNativeInstallCommand(plan: NativeInstallPlan): string;
/**
 * The command every user-facing surface advertises. It is the raw package install plus the parts a
 * raw install cannot do: clearing a stale global `omo` left by a pre-rename release, and checking
 * that the `omo` PATH resolves afterwards is the one omo-ai owns. The tag follows the channel of the
 * running plugin: a prerelease build advertises `@beta` (while `latest` is 4.19.4, which rejects
 * `--platform=native`), a stable build advertises the bare name, which resolves to `latest`.
 */
export declare function formatNativeInstallEntryCommand(plan: NativeInstallPlan, pluginVersion?: string): string;
