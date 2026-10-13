import type { PluginInput } from "@opencode-ai/plugin";
import { log } from "../../shared/logger";
import { type NudgeStateStore } from "./state";
import { type NudgeState } from "./types";
export declare const NATIVE_NUDGE_TOAST_TITLE = "Try OmO Native: no host app needed";
export declare const NATIVE_NUDGE_TOAST_MESSAGE: string;
export declare function nativeEditionStateDir(): string;
export declare function detectNativeEdition(): boolean;
type NativeEditionNudgeDeps = {
    readonly store?: NudgeStateStore;
    readonly detectNativeEdition?: () => boolean;
    readonly now?: () => number;
    readonly interactive?: () => boolean;
    readonly version?: string;
    readonly log?: typeof log;
};
export declare function createNativeEditionNudgeHook(ctx: PluginInput, deps?: NativeEditionNudgeDeps): {
    event: ({ event }: {
        event: {
            type: string;
            properties?: unknown;
        };
    }) => Promise<void>;
};
export declare function snoozeNativeEditionNudge(store: NudgeStateStore, state: NudgeState, at: number, version: string): void;
export {};
