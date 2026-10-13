import type { NativeInstallOutcome } from "./run-native-install";
export declare const NATIVE_SETUP_OFFER_QUESTION = "Run omo setup now to carry your OpenCode credentials, MCP servers and skills over?";
export type NativeSetupRun = (binPath: string, args: readonly string[]) => Promise<number>;
export interface NativeSetupOfferDependencies {
    readonly confirm: (question: string) => Promise<boolean>;
    readonly runSetup?: NativeSetupRun;
    /** Receives the start line right before the setup process takes over the terminal. */
    readonly onStart?: (line: string) => void;
}
export type NativeSetupOfferResult = {
    readonly kind: "not-offered";
} | {
    readonly kind: "declined";
} | {
    readonly kind: "ran";
    readonly binPath: string;
    readonly exitCode: number;
} | {
    readonly kind: "failed";
    readonly binPath: string;
    readonly reason: string;
};
/**
 * Offers to run onboarding with the exact binary the install just verified. An unverified install
 * is never offered: whatever `omo` PATH resolves there is, by definition, not omo-ai, and the PATH
 * fix printed by the verify step stays the next thing to do.
 */
export declare function offerNativeSetup(outcome: Pick<NativeInstallOutcome, "verified" | "omoBinPath">, dependencies: NativeSetupOfferDependencies): Promise<NativeSetupOfferResult>;
export declare function nativeSetupStartLine(binPath: string): string;
/** The line to print after the offer, or null when the offer already finished onboarding. */
export declare function nativeSetupFollowUpLine(result: NativeSetupOfferResult): string | null;
