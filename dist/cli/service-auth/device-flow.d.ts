import { type ChooseDevice, type MachineDevice, type Platform, SignInError } from "./protocol";
import type { Session } from "./session";
export type DisplayCode = {
    readonly verificationUri: string;
    readonly userCode: string;
    readonly matchingCode: string;
    /** When the code stops working (ISO 8601), as the service minted it. */
    readonly expiresAt: string;
};
/** Why a device sign-in stopped: callers branch on the code, never on the message. */
export type DeviceSignInRefusalCode = "approval_denied" | "approval_expired" | "device_limit" | "replace_unsupported" | "replace_mismatch";
export declare class DeviceSignInRefused extends SignInError {
    readonly code: DeviceSignInRefusalCode;
    constructor(code: DeviceSignInRefusalCode, message: string);
}
export type DeviceLoginOptions = {
    readonly name: string;
    readonly platform: Platform;
    readonly show: (code: DisplayCode) => void;
    readonly chooseDevice: ChooseDevice;
    /**
     * #14032: asked once when the service answers `machine_exists`, with the earlier device it names. True starts a new
     * device code that asks the service to replace that device; false (or no callback) keeps the refusal.
     */
    readonly replaceDevice?: (existing: MachineDevice) => Promise<boolean>;
    /** A replacement already agreed on another route (the browser sign-in's `machine_exists`): start with it. */
    readonly replacing?: MachineDevice;
    /** This machine's hardware digest (#6503), sent only when the service advertises machine identity. */
    readonly machineDigest?: string;
    readonly now?: () => number;
    readonly sleep?: (ms: number) => Promise<void>;
};
/** What a finished device sign-in reports: the earlier device the service signed out when this one replaced it. */
export type DeviceLoginResult = {
    readonly replacedDeviceId?: string;
};
export declare function loginDevice(session: Session, options: DeviceLoginOptions): Promise<DeviceLoginResult>;
