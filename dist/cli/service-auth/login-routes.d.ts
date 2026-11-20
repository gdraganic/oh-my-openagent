import { type DeviceLoginOptions, type DeviceLoginResult } from "./device-flow";
import { loginLoopback } from "./loopback";
import type { Session } from "./session";
/**
 * `omo login`'s two routes: the browser sign-in when one is given, else (or when no browser opens) the device code.
 * #14032: a browser sign-in refused with `machine_exists` gets the same replace decision as the device code, and an
 * accepted replacement continues as a device-code replace sign-in, since only that request carries `replace`.
 */
export declare function signInByRoute(session: Session, routes: {
    readonly loopback?: Parameters<typeof loginLoopback>[1];
    readonly device: DeviceLoginOptions;
}): Promise<DeviceLoginResult>;
