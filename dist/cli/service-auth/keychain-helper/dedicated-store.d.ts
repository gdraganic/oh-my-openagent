import type { HelperReply } from "./client";
export type DedicatedStoreState = "absent" | "inactive" | "active";
export declare const dedicatedStoreRoot: (home?: string) => string;
export declare function dedicatedStoreState(home?: string): DedicatedStoreState;
/**
 * A refusal from the dedicated store, or an older helper refusing the store field (it predates #13116), as the one
 * sentence the user acts on; null for any other reply.
 */
export declare function dedicatedStoreRefusal(reply: HelperReply): string | null;
