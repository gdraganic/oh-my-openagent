/** The one switch for OmO service accounts (#10262): set to true when accounts open to everyone. */
export declare const SERVICE_ACCOUNTS_OPEN: boolean;
export declare function serviceAccountsOpen(): boolean;
/**
 * Where this computer signs in to OmO: the desktop app, whose sign-in the CLI shares through `omo account adopt`,
 * or `omo login` in a terminal (while accounts are closed, by device code). Every sign-in hint keys on this, and a
 * closed hint names both routes, so no message sends a person to a command that refuses (#11379, #13265 C11).
 */
export type SignInRoute = "cli" | "desktop";
export declare function signInRoute(open?: boolean): SignInRoute;
export declare function signInHint(when: "first" | "again", route?: SignInRoute): string;
