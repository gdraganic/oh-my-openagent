import type { Session } from "./session";
/** A device the account still lists as signed in; `current` is the device whose token made the request. */
export type LiveDevice = {
    readonly id: string;
    readonly name: string;
    readonly kind?: string;
    readonly platform?: string;
    readonly createdAt?: string;
    readonly lastSeenAt?: string;
    readonly machineBound?: boolean;
    /** Whether the device takes part in the account's memory sync; absent when the service is older than the field. */
    readonly syncing?: boolean;
    readonly current: boolean;
};
export declare function listLiveDevices(session: Pick<Session, "accessToken" | "request">): Promise<LiveDevice[]>;
/** Renames a device of this account; the service answers 404 `not_found` for an id the account does not have. */
export declare function renameDevice(session: Pick<Session, "accessToken" | "request">, id: string, name: string): Promise<void>;
