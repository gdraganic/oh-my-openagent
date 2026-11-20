import { type Credentials } from "./protocol";
/** The longest a refresh's caller waits for the post-refresh device fix-up before it gets its token anyway. */
export declare const DEVICE_FIXUP_BUDGET_MS = 5000;
/** This machine as the service should know it: its hardware digest (undefined when none can be read) and its name. */
export type MachineIdentity = {
    readonly digest: () => Promise<string | undefined>;
    readonly name: () => string;
    /** The fix-up's overall budget; DEVICE_FIXUP_BUDGET_MS when absent. */
    readonly budgetMs?: number;
};
export declare const thisMachine: MachineIdentity;
/** Where a machine_exists refusal is remembered: a non-secret note beside the account's signed-out marker. */
export declare const machineRefusalPath: (home: string, credential: string) => string;
/**
 * After a refresh (#13651): a device signed in before machine identity binds itself to this machine once, and a label
 * omo generated becomes the machine name once. The service's own device list says whether either is still owed, so a
 * later refresh sends nothing. Never throws and never ends, revokes or replaces the sign-in: a machine_exists refusal is
 * logged once and remembered locally, so later refreshes do not ask again until MACHINE_EXISTS_RETRY_MS has passed.
 * Once `signal` aborts (the fix-up budget ran out) it settles at the next step and writes and logs nothing more.
 */
export declare function reconcileDevice(options: {
    readonly api: string;
    readonly credentials: Credentials;
    readonly machine: MachineIdentity;
    readonly nowMs: number;
    readonly request: (path: string, init: RequestInit) => Promise<unknown>;
    readonly accountOf: (access: string) => Promise<string | undefined>;
    /** Records the new name in the stored credential after the service accepted it. */
    readonly renamed: (name: string) => Promise<void>;
    readonly refusalPath: string;
    readonly log: (line: string) => void;
    /** The fix-up budget: every request is expected to abort on it, and the uncancellable steps are raced against it. */
    readonly signal: AbortSignal;
}): Promise<void>;
