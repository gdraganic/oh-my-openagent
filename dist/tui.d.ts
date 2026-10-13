import { Plugin as TuiPlugin } from "@opencode/plugin/tui";
import type { TuiPluginModule } from "@opencode-ai/plugin/tui";
type SidebarSlotRegistration<Node> = {
    readonly order: number;
    readonly slots: {
        readonly sidebar_content: () => Node | (() => Node);
    };
};
type RegisterSidebarContentSlotInput<Node> = {
    readonly registerSlot: (registration: SidebarSlotRegistration<Node>) => void;
    readonly requestRender: () => void;
    readonly renderSidebar: () => Node;
};
export declare function registerSidebarContentSlot<Node>({ registerSlot, requestRender, renderSidebar, }: RegisterSidebarContentSlotInput<Node>): void;
export declare function handleTuiPollError(error: unknown, reportPollError?: (error: Error) => void): void;
export declare function registerV2Sidebar(context: {
    data: {
        session: {
            list: () => ReadonlyArray<{
                id: string;
                title?: string;
            }>;
        };
    };
    ui: {
        toast: {
            show: (options: {
                title?: string;
                message: string;
                variant?: "info" | "success" | "error" | "warning";
            }) => void;
        };
        slot: (claim: {
            append: "sidebar.content";
            render: (input: {
                sessionID: string;
            }) => unknown;
        }) => void;
    };
}): () => ReadonlyArray<string>;
export declare const legacyTuiModule: TuiPluginModule;
declare const _default: {
    id: string;
    setup: (context: TuiPlugin.Context) => Promise<TuiPlugin.Cleanup | void> | TuiPlugin.Cleanup | void;
    tui: import("@opencode-ai/plugin/tui").TuiPlugin;
};
export default _default;
