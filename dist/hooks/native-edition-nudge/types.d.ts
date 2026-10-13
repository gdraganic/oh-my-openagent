export declare const NUDGE_STATE_VERSION = 1;
export declare const NUDGE_INTERVALS_MS: number[];
export declare const NUDGE_AUTO_SHOW_CAP = 4;
export declare const NUDGE_SNOOZE_MS: number;
export declare const NUDGE_CORRUPT_RECOVERY_MS: number;
export type NudgeDecisionOutcome = "none" | "snoozed" | "never" | "migrated";
export type NudgeState = {
    readonly schemaVersion: number;
    readonly autoShows: number;
    readonly lastShownAt: number | null;
    readonly nextEligibleAt: number;
    readonly decision: NudgeDecisionOutcome;
    readonly decidedAt: number | null;
    readonly writtenBy: string;
};
export type NudgeStateRead = NudgeState | "missing" | "corrupt";
export type NudgeSuppressionReason = "already-migrated" | "opted-out" | "non-interactive" | "child-session" | "already-shown-this-process" | "not-yet-eligible" | "lifetime-cap-reached" | "state-unwritable" | "toast-unavailable" | "state-corrupt-recovering";
export type NudgeDecision = {
    readonly show: true;
    readonly reason: "eligible";
    readonly nextState: NudgeState;
} | {
    readonly show: false;
    readonly reason: NudgeSuppressionReason;
    readonly nextState: NudgeState | null;
};
export type NudgeDecisionInput = {
    readonly now: number;
    readonly state: NudgeStateRead;
    readonly nativeEditionInstalled: boolean;
    readonly hookDisabled: boolean;
    readonly interactive: boolean;
    readonly childSession: boolean;
    readonly shownThisProcess: boolean;
    readonly stateWritable: boolean;
    readonly toastAvailable: boolean;
    readonly version: string;
};
