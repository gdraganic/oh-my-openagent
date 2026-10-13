import type { OmoBinEntry } from "./legacy-omo-bin";
export interface LegacyOmoBinRemoval {
    readonly binPath: string;
    readonly packageName: string;
    readonly packageVersion: string | null;
}
export interface LegacyOmoBinRepairFailure {
    readonly binPath: string;
    readonly reason: string;
}
export interface LegacyOmoBinRepair {
    readonly removed: readonly LegacyOmoBinRemoval[];
    readonly failures: readonly LegacyOmoBinRepairFailure[];
    readonly notes: readonly string[];
    readonly warnings: readonly string[];
}
export declare function describePackage(entry: OmoBinEntry): string;
export declare function removeFileCommand(binPath: string, isWindows: boolean): string;
/**
 * Removes only the `omo` command that a pre-rename release left behind. The package that owns it, and
 * every other command it installs, stay in place: the rename orphaned this one alias, and uninstalling
 * somebody's whole global package to install ours is not a decision an installer gets to make.
 */
export declare function repairLegacyOmoBins(entries: readonly OmoBinEntry[], options: {
    readonly isWindows: boolean;
}): LegacyOmoBinRepair;
