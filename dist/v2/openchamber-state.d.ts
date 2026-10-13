export type OpenChamberHost = {
    toast: (input: {
        kind: "info" | "success" | "error";
        message: string;
    }) => void;
    listSessions: () => Promise<Array<{
        id: string;
        title?: string;
    }>>;
    section?: (input: {
        title: string;
        body: string;
    }) => void;
};
export declare function workStatusRows(todos: unknown): string[];
export declare function publishOpenChamberState(input: {
    host: OpenChamberHost;
    readFile: (path: string) => Promise<string>;
}): Promise<{
    toasts: number;
    rows: string[];
    sessions: Array<{
        id: string;
        title?: string;
    }>;
}>;
