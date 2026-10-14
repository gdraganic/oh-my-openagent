import type { Plugin } from "@opencode/plugin";
import { createAdapterState, type AdapterState } from "./adapter-state";
type V2Context = Plugin.Context;
export type FacadeDeps = {
    state?: AdapterState;
    fetchImpl?: typeof fetch;
    argv?: readonly string[];
    listenPort?: () => Promise<number | undefined>;
};
export declare function createV1PluginInput(ctx: V2Context, deps?: FacadeDeps): {
    directory: string;
    worktree: string;
    serverUrl: URL | undefined;
    project: {
        id: string;
        worktree: string;
        time: {
            created: number;
        };
    };
    client: {
        session: Record<string, unknown>;
        tui: {
            showToast: (input?: {
                body?: {
                    title?: string;
                    message?: string;
                    variant?: string;
                    duration?: number;
                };
            }) => Promise<void>;
        };
        app: {
            log: () => Promise<void>;
            agents: () => Promise<{
                data: unknown;
            }>;
            skills: () => Promise<{
                data: unknown;
            }>;
        };
        provider: {
            list: () => Promise<{
                data: unknown;
            }>;
        };
        model: {
            list: () => Promise<{
                data: unknown;
            }>;
        };
        config: {
            get: () => Promise<{
                data: unknown;
            }>;
        };
    };
    $: unknown;
};
export { createAdapterState };
