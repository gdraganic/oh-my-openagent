import { type Goal } from "../hooks/goal/types";
/**
 * The goal driver id OMO declares to OpenChamber (`contributes.goal.driver`
 * of the openchamber-omo extension). A goal OpenChamber finds in
 * `metadata.openchamber.goal` with this driver is shown with its own goal UI
 * and left to OMO's loop.
 */
export declare const OMO_GOAL_DRIVER = "omo";
type Metadata = Record<string, unknown>;
type SessionApi = {
    get: (input: {
        sessionID: string;
    }) => Promise<unknown>;
    update: (input: {
        sessionID: string;
        metadata: Metadata;
    }) => Promise<unknown>;
};
/** OpenChamber's goal record for an OMO goal. OMO keeps seconds; OpenChamber milliseconds. */
export declare function goalMirror(goal: Goal): Metadata;
/**
 * Keeps OMO's `/goal` and OpenChamber's goal of the same session in step.
 *
 * - OMO → OpenChamber: every goal in `.omo/goal` is written to
 *   `metadata.openchamber.goal` with `driver: "omo"` whenever what it shows
 *   changed (status, objective, tokens, turns, budget).
 * - OpenChamber → OMO: a mirror whose status, objective or budget differs
 *   from what this process last wrote was changed by the user, and applies to
 *   OMO's goal. (Comparing `updatedAt` lost the change whenever OMO touched
 *   its goal after the click: every usage tally and continuation bumps it.)
 *   Before this process wrote a mirror (a restart), a newer `updatedAt`
 *   still decides. A resume wakes the goal loop, since an idle session gets
 *   no idle event of its own. A mirror the user cleared, or replaced with an
 *   OpenChamber goal of its own, clears OMO's goal, so the two loops never
 *   run on one session.
 * - A goal cleared in OMO removes its mirror.
 *
 * OpenCode replaces session metadata as a whole, so each write is
 * read-modify-write on the current record.
 */
export type GoalSync = (() => Promise<void>) & {
    /** Syncs one session now (the goal loop calls it before a continuation). */
    session: (sessionID: string) => Promise<void>;
};
export declare function createGoalSync(input: {
    projectDir: string;
    session: SessionApi;
}): GoalSync;
export {};
