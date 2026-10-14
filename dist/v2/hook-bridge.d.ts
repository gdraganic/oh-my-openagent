import type { Plugin } from "@opencode/plugin";
import type { AdapterState } from "./adapter-state";
import { type InternalPromptDispatchArgs } from "../shared/prompt-async-gate";
export type PromptAsyncClient = Extract<InternalPromptDispatchArgs, {
    mode: "async";
}>["client"];
type V2Context = Plugin.Context;
export type V1HookMap = Record<string, unknown>;
export declare function registerV1Hooks(ctx: V2Context, hooks: V1HookMap, state?: AdapterState, promptClient?: PromptAsyncClient): Promise<() => void>;
export {};
