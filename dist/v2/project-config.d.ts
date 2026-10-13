import type { Plugin } from "@opencode/plugin";
type V2Context = Plugin.Context;
export type V2McpServer = {
    type: "remote";
    url: string;
    headers?: Record<string, string>;
    disabled?: boolean;
    oauth?: false;
} | {
    type: "local";
    command: string[];
    cwd?: string;
    environment?: Record<string, string>;
    disabled?: boolean;
};
export declare function mcpServerFromV1(value: unknown): V2McpServer | undefined;
export declare function projectV1Surface(input: {
    ctx: V2Context;
    directory: string;
    config: Record<string, unknown>;
    tools: unknown;
    defineTool?: unknown;
    commandBefore?: (commandInput: {
        command: string;
        sessionID: string;
        arguments: string;
    }, output: {
        parts: Array<{
            type: string;
            text?: string;
        }>;
    }) => Promise<void> | void;
    agentDirectory?: string;
    recordTodos?: {
        read: (sessionID: string) => unknown;
        write: (sessionID: string, input: unknown) => void;
    };
}): Promise<void>;
export {};
