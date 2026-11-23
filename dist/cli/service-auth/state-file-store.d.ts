import { type Stats } from "node:fs";
import type { SealedStore } from "./keystore";
export type StateFileRefusal = "dir-not-a-directory" | "dir-other-owner" | "dir-open" | "symlink" | "not-a-file" | "other-owner" | "open";
/** The file or its directory is not private to this user: it is never used and never written to. */
export declare class StateFileRefused extends Error {
    readonly refusal: StateFileRefusal;
    constructor(refusal: StateFileRefusal);
}
export declare const stateFileDirectory: (home: string) => string;
/** The directory's own entry (never followed): a real directory of this user nobody else can enter. */
export declare const dirRefusal: (stat: Stats, uid: number) => StateFileRefusal | undefined;
/** The opened file itself: a regular file of this user nobody else can read or write. */
export declare const fileRefusal: (stat: Stats, uid: number) => StateFileRefusal | undefined;
/**
 * Replaces the file atomically: a temp file created 0600 (never wider, whatever the umask) in the same private dir,
 * written and synced, then renamed over the old one, then the dir synced. A refused dir is never written to.
 */
export declare function writeStateFile(dir: string, name: string, contents: string, uid: number): Promise<void>;
export type StateFileStore<T> = SealedStore<T> & {
    /** The stored text as written, or null when there is none or it was refused (one line, never its content). */
    readonly text: () => Promise<string | null>;
    /** True while any entry sits at the file's path, refused or not. */
    readonly present: () => Promise<boolean>;
    readonly directory: () => string;
};
export declare function createStateFileStore<T>(input: {
    readonly api: string;
    readonly name: string;
    /** The credential lock's home; the file sits beside the lock, so every process of this user meets on both. */
    readonly home?: string;
    readonly codec: {
        readonly parse: (text: string) => T;
        readonly serialize: (value: T) => string;
        readonly amend?: (previous: string | null, next: T) => T;
    };
    readonly failure: (message: string) => Error;
    readonly log?: (line: string) => void;
}): StateFileStore<T>;
