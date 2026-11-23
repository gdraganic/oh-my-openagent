import type { DelegateTaskArgs } from "./types";
import type { ExecutorContext } from "./executor-types";
import { type CategoryResolutionResult } from "./category-resolution-result";
export declare function resolveCategoryExecution(args: DelegateTaskArgs, executorCtx: ExecutorContext, inheritedModel: string | undefined, systemDefaultModel: string | undefined): Promise<CategoryResolutionResult>;
