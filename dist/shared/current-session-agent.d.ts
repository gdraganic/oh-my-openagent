/**
 * The session's configured agent from OpenCode 2 session metadata. Undefined when the client
 * lacks the capability (OpenCode 1) or the metadata is unavailable, so callers can fall back to
 * message history. Reading history on OpenCode 2 decodes every stored attachment.
 */
export declare function readCurrentSessionAgent(client: unknown, sessionID: string): Promise<string | undefined>;
