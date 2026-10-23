import type { MigrationSourceDescriptor, MigrationTransform } from "@oh-my-opencode/omo-config-core";
import type { ConfigMigrationDiscoveryOptions } from "./types";
import type { ConfigMigrationTransformResult } from "./transform-types";
export type LegacyConfigMigrationPlan = {
    readonly id: string;
    readonly inspect: (sources: Parameters<MigrationTransform>[0]) => ConfigMigrationTransformResult;
    readonly mode?: "merge" | "replace-target";
    readonly shouldRun?: (target: Readonly<Record<string, unknown>>) => boolean;
    readonly sources: readonly MigrationSourceDescriptor[];
    readonly targetPath: string;
    readonly transform: MigrationTransform;
};
export declare const DORI_SECTION_RENAME_MIGRATION_ID = "2026-10-dori-section-rename";
/**
 * The one-shot legacy `gateway` -> `dori` section rename. The caller supplies it, so a host can load it lazily
 * and only when a config still carries the old section (the Senpi entry bundle does; see `dori-section-rename.ts`).
 */
export type DoriSectionRename = {
    readonly shouldRun: (target: Readonly<Record<string, unknown>>) => boolean;
    readonly transform: (document: unknown) => ConfigMigrationTransformResult;
};
export type CreateLegacyConfigMigrationPlansOptions = ConfigMigrationDiscoveryOptions & {
    readonly backupTimestamp?: string;
    readonly doriSectionRename: DoriSectionRename;
};
export declare function createLegacyConfigMigrationPlans(options: CreateLegacyConfigMigrationPlansOptions): readonly LegacyConfigMigrationPlan[];
