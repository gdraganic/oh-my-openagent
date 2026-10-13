export declare function shapeToJsonSchema(shape: Record<string, unknown>): Record<string, unknown>;
export declare function toolInputSchema(tool: {
    args?: unknown;
    parameters?: unknown;
    input?: unknown;
}): Record<string, unknown>;
/**
 * OpenCode V2 validates tool metadata as JSON when it records the result. A
 * V1 field left `undefined` (the task tool's `command`, a model's `variant`)
 * fails that check after the call is already marked settled, so the call stays
 * "running" forever and the next request is rejected for a missing tool_result.
 */
export declare function jsonMetadata(metadata: Record<string, unknown>): Record<string, unknown>;
export declare function toolResult(result: unknown): {
    content: string;
    metadata?: Record<string, unknown>;
};
