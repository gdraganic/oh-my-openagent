export declare function registerGoalSync(projectDir: string, sync: (sessionID: string) => Promise<void>): () => void;
export declare function registerGoalWake(projectDir: string, wake: (sessionID: string) => void): () => void;
/** Applies OpenChamber changes to this session's goal; a no-op without a sync. */
export declare function syncGoalFromClient(projectDir: string, sessionID: string): Promise<void>;
/** Lets the loop continue a goal the user resumed; a no-op without a loop. */
export declare function wakeGoal(projectDir: string, sessionID: string): void;
