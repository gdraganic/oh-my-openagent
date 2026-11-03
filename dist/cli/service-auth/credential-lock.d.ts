/**
 * The one per-origin lock and desktop generation record (account-transport-api v7 section 4.1). The CLI, desktop main
 * and the engine pin boundary all derive these paths here or with the same inputs; never pass a path around instead.
 */
export declare function credentialLockPaths(api: string, home?: string): {
    readonly directory: string;
    readonly lock: string;
    readonly desktopRecord: string;
};
/** Writers and effect boundaries share one origin lock; nested session writes retain ownership. */
export declare function withCredentialLock<T>(api: string, action: () => Promise<T>, home?: string, ownerTag?: string): Promise<T>;
