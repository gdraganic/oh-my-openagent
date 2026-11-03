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
    readonly now?: () => number;
}): {
    request: (path: string, init: RequestInit) => Promise<unknown>;
    signal: AbortSignal | undefined;
    transaction: <T>(action: () => Promise<T>) => Promise<T>;
    ready(): Promise<void>;
    save(value: Credentials): Promise<void>;
    /** The marker an explicit `omo logout` left, or null; only an empty store makes it meaningful. */
    signedOutMarker: () => Promise<{
        device: string | null;
        at: string;
    } | null>;
    clearSignedOutMarker: () => Promise<void>;
    update<T>(action: (current: Credentials | null) => Promise<T>, options?: {
        readonly replaceInvalid?: boolean;
    }): Promise<T>;
    forget(): Promise<void>;
    accessSnapshot: () => Promise<Credentials | null>;
    logout(): Promise<boolean>;
    /** `expect` rejects a stored credential that is no longer the caller's captured identity before any refresh. */
    accessToken(expect?: (current: Credentials) => boolean): Promise<string>;
    removeForLimit(error: unknown, choose: ChooseDevice): Promise<boolean>;
};
export type Session = ReturnType<typeof createSession>;
