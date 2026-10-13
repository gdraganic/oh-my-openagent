export type V2RunTransport = {
    switchAgent: (input: {
        sessionID: string;
        agent: string;
    }) => Promise<void>;
    switchModel: (input: {
        sessionID: string;
        model: {
            id: string;
            providerID: string;
            variant?: string;
        };
    }) => Promise<void>;
    synthetic: (input: {
        sessionID: string;
        text: string;
    }) => Promise<void>;
    prompt: (input: {
        sessionID: string;
        text: string;
        delivery?: "steer" | "queue";
    }) => Promise<unknown>;
    listSessions: () => Promise<Array<Record<string, unknown>>>;
    active: () => Promise<Record<string, {
        type: string;
    }>>;
    events: () => AsyncIterable<unknown>;
};
export declare function createV2RunClient(input: {
    transport: V2RunTransport;
    parentsFile?: string;
    todosFile?: string;
}): {
    session: {
        prompt: (value: unknown) => Promise<{
            data: unknown;
        }>;
        promptAsync: (value: unknown) => Promise<{
            data: unknown;
        }>;
        list(): Promise<{
            data: Record<string, unknown>[];
        }>;
        children(value: unknown): Promise<{
            data: Record<string, unknown>[];
        }>;
        status(): Promise<{
            data: Record<string, {
                type: string;
            }>;
        }>;
        todo(value: unknown): Promise<{
            data: unknown[];
        }>;
        get(value: unknown): Promise<{
            data: Record<string, unknown> | undefined;
        }>;
        create(value: unknown): Promise<{
            data: {
                id: string | undefined;
                title: unknown;
            };
        }>;
    };
    event: {
        subscribe(): Promise<{
            stream: AsyncGenerator<import("../../v2/event-shape").V1Event, void, unknown>;
        }>;
    };
};
export declare function preferV2RunClient<T extends {
    session: object;
    event: object;
}>(client: T, baseUrl: string, directory: string, fetchImpl?: typeof fetch): Promise<T>;
export declare function httpTransport(baseUrl: string, fetchImpl?: typeof fetch): V2RunTransport;
