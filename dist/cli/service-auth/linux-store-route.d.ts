import type { SealedStore } from "./keystore";
import type { StateFileStore } from "./state-file-store";
export type OpenKeyringState = "unlocked" | "absent" | "unknown";
/**
 * What the keyring holds next to a state file: nothing, the same sign-in with a token no fresher than the file's
 * ("older"), the same sign-in with a fresher token ("newer"), or another (or unreadable) sign-in.
 */
export type KeyringRelation = "empty" | "older" | "newer" | "other";
/**
 * Where the shared Linux sign-in lives (#7185b): the Secret Service whenever one exists, the private state file only
 * when none is on the session bus (or Bun has no OS store). A probe that cannot answer keeps an existing file in use
 * and otherwise asks libsecret, as before. Once the Secret Service answers unlocked, a state file moves into it under
 * the credential lock, only over an empty slot or an older copy of the same sign-in, and is deleted only after the
 * keyring returned exactly what was written. "No Secret Service" is per process (cron, su, ssh with no session bus), so
 * a file can hold a sign-in written beside one the keyring already holds: that keyring sign-in is never replaced.
 */
export declare function routeLinuxStore<T>(input: {
    readonly api: string;
    readonly home?: string;
    readonly keyring: SealedStore<T>;
    readonly file: StateFileStore<T>;
    /** Throws for a locked keyring, which never falls back to the file. */
    readonly probe: () => Promise<OpenKeyringState>;
    readonly relation: (text: string) => Promise<KeyringRelation>;
    /** Writes the stored text to the keyring and reads it back; throws, keeping the file, when either step fails. */
    readonly moveToKeyring: (text: string) => Promise<void>;
    readonly notice: (message: string) => void;
}): SealedStore<T>;
