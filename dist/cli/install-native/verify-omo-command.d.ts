import type { OmoBinEnvironment } from "./legacy-omo-bin";
export interface OmoVersionProbeResult {
    readonly exitCode: number;
    readonly stdout: string;
}
export type OmoVersionProbe = (command: string, args: readonly string[]) => Promise<OmoVersionProbeResult>;
export type OmoCommandVerification = {
    readonly ok: true;
    /** The omo-ai `omo` that was verified. */
    readonly binPath: string;
    readonly notes: readonly string[];
    readonly warnings: readonly string[];
} | {
    readonly ok: false;
    readonly notes: readonly string[];
    readonly warnings: readonly string[];
};
export declare function pathOrderFix(directory: string, isWindows: boolean): string;
export declare function verifyOmoCommand(options: {
    readonly environment: OmoBinEnvironment;
    readonly probeVersion: OmoVersionProbe;
}): Promise<OmoCommandVerification>;
