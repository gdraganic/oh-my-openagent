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
export type CredentialStore = {
    readonly read: () => Promise<Credentials | null>;
    readonly write: (value: Credentials) => Promise<void>;
    readonly clear: () => Promise<void>;
};
export declare class CredentialStoreError extends SignInError {
}
export declare class KeychainLockedError extends CredentialStoreError {
}
export declare class SecretServiceUnavailableError extends CredentialStoreError {
}
export declare const quietNotice: (_message: string) => void;
export declare function credentialId(api: string): string;
export declare function createCredentialStore(api: string, secrets?: SecretApi | null, platform?: NodeJS.Platform, lockProbe?: SecretServiceLockProbe, notice?: (message: string) => void): CredentialStore;
export {};
