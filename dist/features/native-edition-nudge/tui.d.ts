import { type NudgeStateStore } from "../../hooks/native-edition-nudge";
export type NativeEditionNudgeAction = "install" | "guide" | "later" | "never";
export declare const NATIVE_NUDGE_DIALOG_TITLE = "OmO Native";
export declare const NATIVE_NUDGE_OPTIONS: readonly {
    readonly value: NativeEditionNudgeAction;
    readonly title: string;
}[];
export type NativeEditionNudgeActionResult = {
    readonly toast: string;
    readonly url?: string;
};
export declare function applyNativeEditionNudgeAction(action: NativeEditionNudgeAction, options: {
    readonly store: NudgeStateStore;
    readonly now: number;
    readonly bunAvailable: boolean;
}): NativeEditionNudgeActionResult;
type TuiApi = {
    readonly command?: {
        readonly register: (factory: () => readonly unknown[]) => (() => void) | undefined;
    };
    readonly ui: {
        readonly dialog: {
            readonly replace: (render: () => unknown) => void;
            readonly clear: () => void;
        };
        readonly DialogSelect: <T>(props: unknown) => unknown;
        readonly toast?: (input: unknown) => void;
    };
};
export declare function registerNativeEditionNudgeTui(api: TuiApi, deps?: {
    readonly store?: NudgeStateStore;
}): () => void;
export {};
