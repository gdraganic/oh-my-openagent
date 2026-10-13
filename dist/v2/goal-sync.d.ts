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
 * - OpenChamber → OMO: a mirror the user changed in OpenChamber (it carries a
 *   newer `updatedAt` than OMO's goal) applies its status, objective and
 *   budget to OMO's goal. A mirror the user cleared, or replaced with an
 *   OpenChamber goal of its own, clears OMO's goal, so the two loops never
 *   run on one session.
 * - A goal cleared in OMO removes its mirror.
 *
 * OpenCode replaces session metadata as a whole, so each write is
 * read-modify-write on the current record.
 */
export declare function createGoalSync(input: {
    projectDir: string;
    session: SessionApi;
}): () => Promise<void>;
export {};
