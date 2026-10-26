import type { z } from "zod";
import { type Credentials, SignInError } from "./protocol";
import { type SecretServiceLockProbe } from "./secret-service-lock";
type SecretKey = {
    readonly service: string;
    readonly name: string;
};
export type SecretApi = {
    readonly get: (key: SecretKey) => Promise<string | null>;
    readonly set: (key: SecretKey & {
        readonly value: string;
    }) => Promise<void>;
    readonly delete: (key: SecretKey) => Promise<boolean>;
};
export type SealedStore<T> = {
    readonly read: () => Promise<T | null>;
    readonly write: (value: T) => Promise<void>;
    readonly clear: () => Promise<void>;
};
export type CredentialStore = SealedStore<Credentials>;
export declare class CredentialStoreError extends SignInError {
}
export declare class KeychainLockedError extends CredentialStoreError {
}
export declare class SecretServiceUnavailableError extends CredentialStoreError {
}
export declare class InvalidCredentialState extends SignInError {
}
/** The OS store has not answered a read in time: it is waiting on a person (a keychain approval dialog, #11262). */
export declare class KeychainApprovalPendingError extends CredentialStoreError {
}
/**
 * How long a read waits for an OS store that has not answered. An unanswered approval dialog blocks the native read
 * with no end, so a session path (memory sync, the memory tool, a host's token) gives up at a deadline and an
 * interactive command keeps waiting but says why.
 */
export type CredentialReadWait = {
    readonly kind: "bounded";
    readonly deadlineMs: number;
} | {
    readonly kind: "interactive";
    readonly noticeAfterMs: number;
    readonly notice: (message: string) => void;
};
export declare const SESSION_READ_WAIT: CredentialReadWait;
export declare const INTERACTIVE_READ_WAIT: CredentialReadWait;
export declare const quietNotice: (_message: string) => void;
export declare function credentialId(api: string): string;
export declare function createCredentialStore(api: string, options?: {
    readonly secrets?: SecretApi | null;
    readonly platform?: NodeJS.Platform;
    readonly lockProbe?: SecretServiceLockProbe;
    readonly notice?: (message: string) => void;
    readonly wait?: CredentialReadWait;
}): CredentialStore;
export declare function createSealedStore<T>(api: string, namespace: "omo-cli" | "omo-cli-v2" | "omo-cli-revocations-v2", schema: z.ZodType<T>, secrets?: SecretApi | null, platform?: NodeJS.Platform, lockProbe?: SecretServiceLockProbe, notice?: (message: string) => void, wait?: CredentialReadWait): SealedStore<T>;
export {};
