/**
 * Kimi K3.1 Sisyphus prompt: its own copy of kimi-k3.ts (Q, 2026-10-24), so later K3 tuning never
 * changes what K3.1 sees. Copied at omo dev de27f2ebfa; only the identity line and the function names
 * differ. Tune it on K3.1 evidence from here on. The K3 design notes in kimi-k3.ts applied at the copy.
 */
import type { AvailableAgent, AvailableTool, AvailableSkill, AvailableCategory } from "../dynamic-agent-prompt-builder";
import { categorizeTools } from "../dynamic-agent-prompt-builder";
export declare function buildKimiK31SisyphusPrompt(model: string, availableAgents: AvailableAgent[], availableTools?: AvailableTool[], availableSkills?: AvailableSkill[], availableCategories?: AvailableCategory[], useTaskSystem?: boolean): string;
export { categorizeTools };
