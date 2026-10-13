import type { OmoBinEnvironment } from "./legacy-omo-bin";
import type { OmoVersionProbe } from "./verify-omo-command";
import type { NativeInstallPlan } from "./plan";
export interface NativeInstallSpawnResult {
    readonly exitCode: number;
    readonly stderr?: string;
}
export type NativeInstallSpawn = (command: string, args: readonly string[]) => Promise<NativeInstallSpawnResult>;
export interface NativeInstallDependencies {
    readonly isBunAvailable: () => boolean | Promise<boolean>;
    readonly spawn: NativeInstallSpawn;
    readonly environment: OmoBinEnvironment;
    readonly probeVersion: OmoVersionProbe;
}
export interface NativeInstallFailure {
    readonly reason: string;
    readonly manualCommand: string;
    readonly hints?: readonly string[];
}
export interface NativeInstallOutcome {
    readonly ok: boolean;
    /** The `omo` that PATH resolves after the install is the one omo-ai owns. */
    readonly verified: boolean;
    /** The verified omo-ai binary; set only when `verified`, so onboarding never runs a bare `omo` lookup. */
    readonly omoBinPath?: string;
    readonly plan: NativeInstallPlan;
    readonly notes: readonly string[];
    readonly warnings: readonly string[];
    readonly failure?: NativeInstallFailure;
}
export declare function runNativeInstall(dependencies?: NativeInstallDependencies): Promise<NativeInstallOutcome>;
export declare function nativeInstallSuccessLine(verified: boolean): string;
export declare function nativeInstallFailureLines(failure: NativeInstallFailure): readonly string[];
