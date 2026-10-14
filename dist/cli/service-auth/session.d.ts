import { type CredentialStore } from "./keystore";
import { type ChooseDevice, type Credentials } from "./protocol";
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
    logout(): Promise<boolean>;
    accessToken(): Promise<string>;
    removeForLimit(error: unknown, choose: ChooseDevice): Promise<boolean>;
};
export type Session = ReturnType<typeof createSession>;
