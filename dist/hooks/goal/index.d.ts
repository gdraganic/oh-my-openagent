import type { PluginInput } from "@opencode-ai/plugin";
import type { Goal } from "./types";
export type GoalHookOptions = {
    readonly projectDir: string;
    readonly autoStart?: boolean;
    readonly ultrawork?: boolean;
    readonly getSessionExists?: (sessionID: string) => Promise<boolean>;
    /** Continuations allowed before the goal stops as `blocked` (config `goal.default_max_iterations`). */
    readonly maxTurns?: number;
    /** Whether a background task launched from the session still runs; its result wakes the session. */
    readonly hasActiveBackgroundTasks?: (sessionID: string) => boolean;
    /** Delay before looking again when the prompt gate still held the session. */
    readonly retryDelayMs?: number;
};
export type GoalHook = {
    readonly setGoal: (sessionID: string, objective: string) => Goal;
    readonly getGoal: (sessionID: string) => Goal | null;
    readonly pauseGoal: (sessionID: string) => Goal | null;
    readonly resumeGoal: (sessionID: string) => Goal | null;
    readonly clearGoal: (sessionID: string) => boolean;
    readonly markComplete: (sessionID: string) => Goal | null;
    readonly event: (input: {
        event: {
            type: string;
            properties?: unknown;
        };
    }) => Promise<void>;
};
export declare function createGoalHook(ctx: PluginInput, options: GoalHookOptions): GoalHook;
