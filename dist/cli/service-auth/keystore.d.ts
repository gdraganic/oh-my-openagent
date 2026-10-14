import { type Credentials } from "./protocol";
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
export declare function credentialId(api: string): string;
export declare function createCredentialStore(api: string, secrets?: SecretApi | null, platform?: NodeJS.Platform): CredentialStore;
export {};
