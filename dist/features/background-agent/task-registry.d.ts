import type { BackgroundTask } from "./types";
/** `owner` is the directory of the plugin instance that runs the task. */
export declare function rememberBackgroundTask(task: BackgroundTask, owner?: string): void;
export declare function archiveBackgroundTask(task: BackgroundTask): void;
export declare function getRegisteredBackgroundTask(taskID: string): BackgroundTask | undefined;
export declare function listRegisteredBackgroundTasks(owner: string): BackgroundTask[];
/** Whether a task launched from this session is still queued or running, whichever plugin instance runs it. */
export declare function hasActiveBackgroundTaskFor(parentSessionID: string): boolean;
export declare function forgetBackgroundTask(taskID: string): void;
export declare function clearBackgroundTaskRegistryForTesting(): void;
/** What a client may ask of a running plugin instance's background manager. */
export type BackgroundTaskControl = {
    getTask(id: string): BackgroundTask | undefined;
    cancelTask(id: string, options?: {
        source?: string;
        reason?: string;
    }): Promise<boolean>;
    launch(input: import("./types").LaunchInput): Promise<BackgroundTask>;
};
/** The manager running tasks for the plugin instance in `owner` (its directory). */
export declare function registerBackgroundTaskControl(owner: string, control: BackgroundTaskControl): void;
export declare function getBackgroundTaskControl(owner: string): BackgroundTaskControl | undefined;
