import type { Plugin } from "@opencode/plugin";
import { updateConnectedProvidersCache } from "../shared/connected-providers-cache";
import { type V1HookMap } from "./hook-bridge";
type V1Server = (input: never, options: unknown) => Promise<V1HookMap>;
export declare function primeConnectedProvidersCache(client: Parameters<typeof updateConnectedProvidersCache>[0], deps?: {
    hasCache?: () => boolean;
    update?: typeof updateConnectedProvidersCache;
    timeoutMs?: number;
}): Promise<void>;
export declare function refreshProviderCacheWhenServerReady(client: Parameters<typeof updateConnectedProvidersCache>[0], deps: {
    probe: () => Promise<boolean>;
    update?: typeof updateConnectedProvidersCache;
    attempts?: number;
    delayMs?: number;
    sleep?: (ms: number) => Promise<void>;
}): Promise<boolean>;
export declare function setupOpenCodeV2(ctx: Plugin.Context, deps: {
    server: V1Server;
    agentDirectory?: string;
}): Promise<(() => Promise<void> | void) | void>;
export {};
