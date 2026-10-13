import type { AdapterState } from "./adapter-state";
export declare function agentsFrom(value: unknown): {
    data: Array<Record<string, unknown>>;
};
export declare function modelsFrom(value: unknown): {
    data: Array<{
        provider: string;
        id: string;
    }>;
};
export declare function providersFrom(providers: unknown, models: unknown): {
    data: {
        connected: string[];
        all: Array<{
            id: string;
            models: Record<string, {
                id: string;
            }>;
        }>;
    };
};
export declare function skillsFrom(value: unknown): {
    data: Array<Record<string, unknown>>;
};
export declare function configData(directory?: string): {
    data: Record<string, unknown>;
};
export declare function sessionCatalog(input: {
    origin: string | undefined;
    fetchImpl: typeof fetch;
    state: AdapterState;
    known: Array<Record<string, unknown>>;
    databaseFile?: string;
}): Promise<Array<Record<string, unknown>>>;
export declare function presentSession(session: Record<string, unknown>): Record<string, unknown>;
/** The sidebar needs active drains, not a paginated scan of session history. */
export declare function activeSessionStatusMap(input: {
    origin: string | undefined;
    fetchImpl: typeof fetch;
    state: AdapterState;
}): Promise<Record<string, {
    type: string;
}>>;
export declare function sessionStatusMap(input: {
    origin: string | undefined;
    fetchImpl: typeof fetch;
    state: AdapterState;
}): Promise<Record<string, {
    type: string;
}>>;
export declare function serveOrigin(argv: readonly string[], listenPort: () => Promise<number | undefined>): Promise<string | undefined>;
