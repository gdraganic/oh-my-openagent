import { Command } from "commander";
import { type ListedDevice } from "./protocol";
import { type DeviceServiceHandoff, type Session } from "./session";
/**
 * Login order (#6503): refuse a second device from the stored sign-in and the machine's device service before
 * `/v1/health`. A logged-out computer is the one that waits on accounts being reachable.
 */
export declare function beginLogin(session: Pick<Session, "accessSnapshot" | "request">, deviceService: DeviceServiceHandoff | undefined, api: string): Promise<unknown>;
type Options = {
    readonly api?: string;
    readonly accounts?: string;
    readonly device?: boolean;
    readonly browser?: boolean;
    readonly help?: boolean;
};
/** What the host adds to the account commands: its device service for an API origin (design D r9 sections 4-5). */
export type ServiceAuthHooks = {
    readonly deviceService?: (api: string) => DeviceServiceHandoff;
};
export declare function deviceChoices(devices: readonly ListedDevice[]): {
    value: string;
    label: string;
}[];
/** The OmO sign-in page. `accounts.omo.dev` is the identity provider's own account portal (#9965). */
export declare const DEFAULT_ACCOUNTS_ORIGIN = "https://signin.omo.dev";
/** The sign-in origin: the `--accounts` flag, then `OMO_SERVICE_ACCOUNTS_URL`, then the default. */
export declare function accountsOrigin(options: Pick<Options, "accounts">, env: Record<string, string | undefined>): string;
export { SERVICE_ACCOUNTS_OPEN } from "./accounts-gate";
/** #13265: the forms of omo login that still refuse while accounts are closed hear a refusal that names the route. */
export declare const CLOSED_LOGIN_MESSAGE = "This form of omo login isn't available while OmO accounts are closed. Run plain omo login to sign in by device code (the route for a computer without the OmO desktop app's sign-in), or omo login --device.";
export declare function configureServiceAuthCommands(program: Command, open?: boolean, hooks?: ServiceAuthHooks): void;
/** The root program the service-auth bundle parses `omo login|logout|whoami` with. */
export declare function serviceAuthProgram(open?: boolean, hooks?: ServiceAuthHooks): Command;
export declare function runServiceAuthCommand(args: readonly string[], hooks?: ServiceAuthHooks): Promise<void>;
