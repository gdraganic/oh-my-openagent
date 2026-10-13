import type { PluginInput } from "@opencode-ai/plugin";
/**
 * The five Effort bands the plan template offers. Effort is a size signal, never a wall-clock
 * estimate: a plan that says "200 hours" is model prose, not a measurement.
 */
export declare const PLAN_EFFORT_BANDS: readonly ["Quick", "Short", "Medium", "Large", "XL"];
export type PlanEffortBand = (typeof PLAN_EFFORT_BANDS)[number];
/** Maps a written duration ("200 hours", "3 days", "2-3 weeks") to the band that bounds it. */
export declare function effortBandForDuration(value: string): PlanEffortBand | null;
type EffortNormalization = {
    readonly content: string;
    readonly original: string;
    readonly band: PlanEffortBand;
};
/**
 * Rewrites an `**Effort:**` value that carries a duration to the bounding band. Band values,
 * localized labels, and anything without a number+unit are left alone.
 */
export declare function normalizePlanEffort(content: string): EffortNormalization | null;
/**
 * Programmatic plan format validator.
 *
 * After any agent writes to a `.omo/plans/*.md` file, compares the
 * raw top-level checkbox count against `getPlanProgress()` to detect
 * malformed task labels. Warns the agent when some or all tasks
 * will be skipped by the progress counter.
 */
export declare function createPlanFormatValidatorHook(_ctx: PluginInput): {
    "tool.execute.after": (input: {
        tool: string;
        sessionID: string;
        callID: string;
        args?: Record<string, unknown>;
    }, output: {
        title: string;
        output: string;
        metadata: unknown;
    }) => Promise<void>;
};
export {};
