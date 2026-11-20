import type { SignatureVerdict } from "./signature";
/** Removes the pin directories of processes that are gone (a crash skips the exit cleanup). A live owner's is kept. */
export declare function sweepDeadPinDirs(root?: string): readonly string[];
export type PinResult = {
    readonly kind: "pinned";
    readonly path: string;
} | {
    readonly kind: "invalid";
} | {
    readonly kind: "unavailable";
    readonly reason: string;
};
/**
 * Copies a located helper to a path determined by its bytes, makes the copy read-only, and verifies the COPY.
 * The process then spawns only that copy, so a file written to the original path later (a dev build, a broken
 * install) is never executed. The same bytes keep the same path, including across processes, because a macOS
 * trusted-application entry can name that path: a fresh random name on every launch never matches it.
 * One copy is kept per source file identity; a source that changes gets a fresh copy.
 */
export declare function pinVerifiedCopy(source: string, verify: (path: string) => Promise<SignatureVerdict>, dir?: string): Promise<PinResult>;
