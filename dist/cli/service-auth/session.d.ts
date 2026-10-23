import { type CredentialStore } from "./keystore";
import { type ChooseDevice, type Credentials, SignInError } from "./protocol";
export declare class SessionEnded extends SignInError {
    readonly deviceRevoked: boolean;
    readonly code: string;
    constructor(message: string, deviceRevoked: boolean, code: string);
}
export declare function createSession(options: {
    readonly api: string;
    readonly store: CredentialStore;
    readonly home?: string;
    readonly signal?: AbortSignal;
}): {
    request: (path: string, init: RequestInit) => Promise<unknown>;
    signal: AbortSignal | undefined;
    ready(): Promise<void>;
    save(value: Credentials): Promise<void>;
    update<T>(action: (current: Credentials | null) => Promise<T>): Promise<T>;
    logout(): Promise<boolean>;
    accessToken(): Promise<string>;
    removeForLimit(error: unknown, choose: ChooseDevice): Promise<boolean>;
};
export type Session = ReturnType<typeof createSession>;
