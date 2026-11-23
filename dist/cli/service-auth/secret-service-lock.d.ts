export type SecretServiceLockState = "locked" | "unlocked" | "absent" | "unknown";
export type SecretServiceLockProbe = () => Promise<SecretServiceLockState>;
export declare const parseLockedReply: (stdout: string) => SecretServiceLockState | null;
export declare const classifyProbeFailure: (stderr: string) => SecretServiceLockState;
export declare const probeSecretServiceLock: SecretServiceLockProbe;
