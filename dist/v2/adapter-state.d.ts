export type TodoItem = {
    id?: string;
    content: string;
    status: string;
    priority?: string;
};
type ToastItem = {
    title?: string;
    message: string;
    variant?: string;
};
export type AdapterState = {
    directory: string;
    status: Map<string, {
        type: string;
    }>;
    sessions: Map<string, Record<string, unknown>>;
    pendingManualContinue: Set<string>;
    recordParent: (childID: string, parentID: string) => void;
    parentOf: (childID: string) => string | undefined;
    parents: () => Record<string, string>;
    recordTodos: (sessionID: string, input: unknown) => void;
    todos: (sessionID: string) => TodoItem[];
    recordToast: (input: {
        title?: string;
        message?: string;
        variant?: string;
        duration?: number;
    }) => void;
    readToasts: () => ToastItem[];
    noteStatus: (sessionID: string, type: string) => void;
    noteSession: (session: Record<string, unknown>) => void;
};
export declare function createAdapterState(directory: string): AdapterState;
export {};
