import { Command } from "commander";
import { type ListedDevice } from "./protocol";
type Options = {
    readonly api?: string;
    readonly accounts?: string;
    readonly device?: boolean;
    readonly browser?: boolean;
};
export declare function deviceChoices(devices: readonly ListedDevice[]): {
    value: string;
    label: string;
}[];
/** The OmO sign-in page. `accounts.omo.dev` is the identity provider's own account portal (#9965). */
export declare const DEFAULT_ACCOUNTS_ORIGIN = "https://signin.omo.dev";
/** The sign-in origin: the `--accounts` flag, then `OMO_SERVICE_ACCOUNTS_URL`, then the default. */
export declare function accountsOrigin(options: Pick<Options, "accounts">, env: Record<string, string | undefined>): string;
/** The one switch for OmO service accounts (#10262): set to true when accounts open to everyone. */
export declare const SERVICE_ACCOUNTS_OPEN: boolean;
export declare const SERVICE_ACCOUNTS_CLOSED_MESSAGE = "OmO accounts aren't available yet.";
export declare function configureServiceAuthCommands(program: Command, open?: boolean): void;
export declare function runServiceAuthCommand(args: readonly string[]): Promise<void>;
export {};
