/**
 * - `agent`: the session's configured agent (OpenCode 2 `Session.Info.agent`).
 * - `default`: OpenCode 2 session without a configured agent. Agents only change through
 *   switchAgent, which records one, so every turn ran the default agent and history adds nothing.
 * - `unknown`: OpenCode 1 client or metadata unavailable; callers fall back to message history.
 */
export type CurrentSessionAgent = {
    readonly kind: "agent";
    readonly name: string;
} | {
    readonly kind: "default";
} | {
    readonly kind: "unknown";
};
/** Reads the agent without the session history, whose decode revalidates every stored attachment. */
export declare function readCurrentSessionAgent(client: unknown, sessionID: string): Promise<CurrentSessionAgent>;
