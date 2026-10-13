import type { Plugin } from "@opencode/plugin";
import { type V1HookMap } from "./hook-bridge";
type V1Server = (input: never, options: unknown) => Promise<V1HookMap>;
export declare function setupOpenCodeV2(ctx: Plugin.Context, deps: {
    server: V1Server;
    agentDirectory?: string;
}): Promise<(() => Promise<void> | void) | void>;
export {};
