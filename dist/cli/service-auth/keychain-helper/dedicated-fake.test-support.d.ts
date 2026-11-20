import type { HelperCall, HelperLease, HelperReply } from "./client";
import type { DedicatedStoreState } from "./dedicated-store";
/**
 * The login keychain and OmO's own keychain behind one fake helper, with the routing the real helper enforces
 * (packages/omo-native/keychain-helper/src/store-select.c, proven against the real helper by
 * keychain-helper-dedicated.test.ts): no store field is refused while active, "omo" is refused while inactive,
 * "omo-migrate" and "login" are the copy steps, and store-erase keeps a sign-in.
 */
export declare function dedicatedFake(options?: {
    readonly loginLocked?: boolean;
    readonly state?: DedicatedStoreState;
    /** The keychain file is gone but the folder remains (a crash inside an erase): only store-erase can open it. */
    readonly keychainGone?: boolean;
    /** A damaged store (wrong mode, bad key): every call that opens it is refused; deactivation still works. */
    readonly damaged?: boolean;
}): {
    login: {
        items: Map<string, {
            value: string;
            owner: import("./fake-keychain.test-support").Owner;
            partition: "ours" | "other" | "none";
            marker: boolean;
            cdat: number;
            mdat: number;
        }>;
        events: string[];
        stats: {
            approves: number;
            unleasedMutations: number;
        };
        secrets: import("../keystore").SecretApi;
        secretsAs: (identity: import("./fake-keychain.test-support").Owner) => import("../keystore").SecretApi;
        access: {
            readonly kind: "ready";
            readonly path: string;
            readonly call: (call: HelperCall, lease?: HelperLease) => Promise<HelperReply>;
        };
        put: (name: string, value: string, owner: import("./fake-keychain.test-support").Owner, partition?: "none" | "other" | "ours") => Map<string, {
            value: string;
            owner: import("./fake-keychain.test-support").Owner;
            partition: "ours" | "other" | "none";
            marker: boolean;
            cdat: number;
            mdat: number;
        }>;
        cache: {
            consume(current: import("./approval-cache").ItemAttributes): string | null;
            deniedForBackground: () => boolean;
            inFlight: () => Promise<import("./approval-cache").ApprovalAnswer> | null;
            approve(run: () => Promise<import("./approval-cache").ApprovalAnswer>): Promise<import("./approval-cache").ApprovalAnswer>;
            afterOwnWrite(value: string, readAttributes: () => Promise<import("./approval-cache").ItemAttributes | null>): Promise<void>;
            drop(): void;
        };
    };
    omo: {
        items: Map<string, {
            value: string;
            owner: import("./fake-keychain.test-support").Owner;
            partition: "ours" | "other" | "none";
            marker: boolean;
            cdat: number;
            mdat: number;
        }>;
        events: string[];
        stats: {
            approves: number;
            unleasedMutations: number;
        };
        secrets: import("../keystore").SecretApi;
        secretsAs: (identity: import("./fake-keychain.test-support").Owner) => import("../keystore").SecretApi;
        access: {
            readonly kind: "ready";
            readonly path: string;
            readonly call: (call: HelperCall, lease?: HelperLease) => Promise<HelperReply>;
        };
        put: (name: string, value: string, owner: import("./fake-keychain.test-support").Owner, partition?: "none" | "other" | "ours") => Map<string, {
            value: string;
            owner: import("./fake-keychain.test-support").Owner;
            partition: "ours" | "other" | "none";
            marker: boolean;
            cdat: number;
            mdat: number;
        }>;
        cache: {
            consume(current: import("./approval-cache").ItemAttributes): string | null;
            deniedForBackground: () => boolean;
            inFlight: () => Promise<import("./approval-cache").ApprovalAnswer> | null;
            approve(run: () => Promise<import("./approval-cache").ApprovalAnswer>): Promise<import("./approval-cache").ApprovalAnswer>;
            afterOwnWrite(value: string, readAttributes: () => Promise<import("./approval-cache").ItemAttributes | null>): Promise<void>;
            drop(): void;
        };
    };
    calls: HelperCall[];
    access: {
        readonly kind: "ready";
        readonly path: string;
        readonly call: (call: HelperCall, lease?: HelperLease) => Promise<HelperReply>;
    };
    state: () => DedicatedStoreState;
};
export declare const LEASE: HelperLease;
