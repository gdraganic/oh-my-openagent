import type { Plugin } from "@opencode/plugin";
import type { AdapterState } from "./adapter-state";
type V2Context = Plugin.Context;
export type V1HookMap = Record<string, unknown>;
export declare function registerV1Hooks(ctx: V2Context, hooks: V1HookMap, state?: AdapterState): Promise<() => void>;
export {};
