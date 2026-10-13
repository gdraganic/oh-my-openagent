export type V1Message = {
    info: Record<string, unknown>;
    parts: Array<Record<string, unknown>>;
};
export declare function storedMessagesToV1(messages: unknown, sessionID: string): V1Message[];
export declare function hookMessagesToV1(messages: readonly unknown[], sessionID: string): V1Message[];
export declare function writeHookMessagesBack<T>(original: readonly T[], edited: readonly V1Message[]): T[];
