import { storedMessagesToV1 } from "./message-shape";
import type { AdapterState } from "./adapter-state";
import { SessionHttpError } from "./serve-http";
export declare function sessionIDFrom(input: unknown): string | undefined;
type SessionApi = {
    get: (input: {
        sessionID: string;
    }) => Promise<Record<string, unknown>>;
    context: (input: {
        sessionID: string;
    }) => Promise<unknown>;
    prompt: (input: {
        sessionID: string;
        text: string;
        delivery?: "steer" | "queue";
    }) => Promise<unknown>;
    create: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
    interrupt: (input: {
        sessionID: string;
    }) => Promise<unknown>;
    switchAgent: (input: {
        sessionID: string;
        agent: string;
    }) => Promise<unknown>;
    switchModel: (input: {
        sessionID: string;
        model: {
            id: string;
            providerID: string;
            variant?: string;
        };
    }) => Promise<unknown>;
    synthetic: (input: {
        sessionID: string;
        text: string;
    }) => Promise<unknown>;
    update: (input: {
        sessionID: string;
        permissions?: Array<{
            action: string;
            resource: string;
            effect: "allow" | "deny" | "ask";
        }>;
    }) => Promise<unknown>;
    remove?: (input: {
        sessionID: string;
    }) => Promise<unknown>;
    compact?: (input: {
        sessionID: string;
    }) => Promise<unknown>;
};
export declare function withParent(session: Record<string, unknown>, state: AdapterState): Record<string, unknown>;
export declare function childSessions(sessions: Array<Record<string, unknown>>, parentID: string, state: AdapterState): Array<Record<string, unknown>>;
export declare function createSession(api: SessionApi, input: unknown, state: AdapterState, directory: string): Promise<Record<string, unknown>>;
export declare function sendPrompt(api: SessionApi, input: unknown): Promise<unknown>;
export declare function readMessages(api: SessionApi, input: unknown): Promise<ReturnType<typeof storedMessagesToV1>>;
export declare function readMessage(api: SessionApi, input: unknown): Promise<ReturnType<typeof storedMessagesToV1>[number] | undefined>;
export { SessionHttpError };
