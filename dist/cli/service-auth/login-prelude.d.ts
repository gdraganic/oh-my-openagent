import { SignInError } from "./protocol";
import type { DeviceServiceHandoff, Session } from "./session";
/** The account service did not answer its health probe, so no sign-in started. */
export declare class AccountsUnreachable extends SignInError {
}
/**
 * Login order (#6503): refuse a second device from the stored sign-in and the machine's device service before
 * `/v1/health`. A logged-out computer is the one that waits on accounts being reachable.
 */
export declare function beginLogin(session: Pick<Session, "accessSnapshot" | "request">, deviceService: DeviceServiceHandoff | undefined, api: string): Promise<unknown>;
