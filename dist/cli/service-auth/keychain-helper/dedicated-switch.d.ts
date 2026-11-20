import type { HelperAccess } from "./access";
import type { HelperLease } from "./client";
import { type DedicatedStoreState } from "./dedicated-store";
/**
 * Turning OmO's own keychain on and off (#13116 design r2, finding 2). Both run inside the credential lock that every
 * refresh write takes, and the `active` marker is written last on enable and removed first on disable, so at every
 * step exactly one store is authoritative: a crash leaves either the old store selected with the sign-in still in it,
 * or the new one selected with the sign-in already copied and read back.
 */
export type StoreSwitchDeps = {
    readonly access: Extract<HelperAccess, {
        kind: "ready";
    }>;
    readonly account: string;
    readonly lease: HelperLease;
    readonly state: () => DedicatedStoreState;
};
/** How the login keychain's sign-in was handled: moved, absent, or left there because it could not be read silently. */
export type EnableMove = "copied" | "none" | "kept-active" | "left-locked" | "left-unreadable";
export type EnableOutcome = {
    readonly created: boolean;
    readonly moved: EnableMove;
    readonly loginLeftover: boolean;
};
export type DisableOutcome = {
    readonly moved: "copied" | "none";
    readonly erased: boolean;
    readonly damagedLeftInPlace?: true;
};
export declare class StoreSwitchError extends Error {
}
export declare function storeSwitch(deps: StoreSwitchDeps): {
    enable(): Promise<EnableOutcome>;
    disable(discard: boolean): Promise<DisableOutcome>;
};
