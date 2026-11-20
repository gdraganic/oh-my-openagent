export declare function createWorktreeActiveBlock(worktreePath: string): string;
export interface PrDeliveryFlags {
    readonly makePr: boolean;
    readonly ship: boolean;
}
export declare function createPrDeliveryBlock(flags: PrDeliveryFlags, worktreePath: string | undefined): string;
/** `--light` (#14388): keep the plan, drop the per-step ceremony, verify once at the end. */
export declare function createLightProfileBlock(): string;
