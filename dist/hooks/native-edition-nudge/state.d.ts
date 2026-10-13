import { type NudgeState, type NudgeStateRead } from "./types";
export declare const NUDGE_STATE_FILE = "native-nudge.json";
export type NudgeStateStore = {
    readonly read: () => NudgeStateRead;
    readonly write: (state: NudgeState) => boolean;
    readonly probeWritable: () => boolean;
};
export declare function parseNudgeState(raw: string): NudgeStateRead;
export declare function createNudgeStateStore(stateDir: string): NudgeStateStore;
