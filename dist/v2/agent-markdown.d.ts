export type AgentPermissionEffect = "allow" | "deny" | "ask";
export type AgentPermissionRule = {
    action: string;
    resource: string;
    effect: AgentPermissionEffect;
};
export declare function agentMarkdownDirectory(override?: string): string;
export declare function agentFileName(name: string): string;
export declare function nestedAgentID(name: string): string;
export declare function permissionsFromV1(permission: unknown): AgentPermissionRule[];
export declare function renderAgentMarkdown(name: string, config: Record<string, unknown>): string | undefined;
export type WrittenAgent = {
    name: string;
    id: string;
    path: string;
    changed: boolean;
};
export declare function writeAgentMarkdown(input: {
    directory: string;
    agents: Record<string, unknown>;
}): WrittenAgent[];
