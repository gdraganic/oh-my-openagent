import { Plugin } from "@opencode/plugin";
export declare const omoPlugin: import("@opencode-ai/plugin").Plugin;
declare const _default: {
    id: string;
    setup: (context: Plugin.Context) => Promise<Plugin.Cleanup | void> | Plugin.Cleanup | void;
    server: import("@opencode-ai/plugin").Plugin;
};
export default _default;
export type { AgentName, AgentOverrideConfig, AgentOverrides, BuiltinCommandName, HookName, McpName, OhMyOpenCodeConfig, } from "./config";
export type { ConfigLoadError } from "./shared/config-errors";
