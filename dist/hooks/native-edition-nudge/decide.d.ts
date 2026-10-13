import { type NudgeDecision, type NudgeDecisionInput, type NudgeState } from "./types";
export declare function decideNativeEditionNudge(input: NudgeDecisionInput): NudgeDecision;
export declare function snoozedState(previous: NudgeState, now: number, version: string, snoozeMs: number): NudgeState;
export declare function decidedState(previous: NudgeState, now: number, version: string, decision: "never" | "migrated"): NudgeState;
