export type SessionPage = {
    data: Array<Record<string, unknown>>;
    cursor?: {
        next?: string | null;
    };
};
export declare class SessionHttpError extends Error {
    readonly status: number;
    constructor(status: number);
}
export declare function resolveServeOrigin(input: {
    argv: readonly string[];
    listenPort: () => Promise<number | undefined>;
}): Promise<string | undefined>;
export declare function listenPortOf(pid?: number): Promise<number | undefined>;
export declare function serverAuthCandidates(): Array<string | undefined>;
export declare function _resetServerAuthForTesting(): void;
export declare function serverFetch(url: string, init: RequestInit, fetchImpl: typeof fetch): Promise<Response>;
export declare function listModels(origin: string, directory: string, fetchImpl: typeof fetch): Promise<Array<Record<string, unknown>>>;
export declare function listSessions(origin: string, fetchImpl: typeof fetch): Promise<Array<Record<string, unknown>>>;
export declare function activeSessions(origin: string, fetchImpl: typeof fetch): Promise<Record<string, {
    type: string;
}>>;
/** A session record over HTTP; `metadata` is what OpenCode stored for it. */
export declare function getSessionRecord(origin: string, sessionID: string, fetchImpl: typeof fetch): Promise<Record<string, unknown>>;
/**
 * Replaces a session's metadata. The plugin `session.update` accepts metadata
 * but OpenCode 2.0.x does not store it from there; this is the route
 * OpenChamber writes goal metadata through.
 */
export declare function patchSessionMetadata(origin: string, sessionID: string, metadata: Record<string, unknown>, fetchImpl: typeof fetch): Promise<void>;
