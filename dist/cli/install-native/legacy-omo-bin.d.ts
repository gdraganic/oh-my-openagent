export declare const NATIVE_OMO_PACKAGE = "omo-ai";
export declare const LEGACY_OMO_BIN_PACKAGES: readonly string[];
export type OmoBinKind = "native" | "legacy" | "foreign";
export interface OmoBinEnvironment {
    readonly pathDirectories: readonly string[];
    readonly extraDirectories: readonly string[];
    readonly isWindows: boolean;
}
export interface OmoBinEntry {
    readonly binPath: string;
    readonly directory: string;
    readonly onPath: boolean;
    readonly kind: OmoBinKind;
    readonly packageName: string | null;
    readonly packageVersion: string | null;
    /** Every file that carries this `omo` command, including the Windows `.cmd` / `.ps1` siblings. */
    readonly shimPaths: readonly string[];
}
export declare function resolveOmoBinEnvironment(input: {
    readonly env: Record<string, string | undefined>;
    readonly platform: string;
    readonly homeDir: string;
}): OmoBinEnvironment;
export declare function scanOmoBins(environment: OmoBinEnvironment): readonly OmoBinEntry[];
export declare function legacyOmoBins(entries: readonly OmoBinEntry[]): readonly OmoBinEntry[];
export declare function nativeOmoBin(entries: readonly OmoBinEntry[]): OmoBinEntry | null;
export declare function firstOmoBinOnPath(entries: readonly OmoBinEntry[]): OmoBinEntry | null;
