import type { ConfigMigrationTransformResult } from "./transform-types";
export declare const SUBSCRIPTION_PROVIDER_RENAME_MIGRATION_ID = "2026-09-subscription-provider-rename";
export declare function hasLegacySubscriptionProviderIds(document: unknown): boolean;
export declare function transformSubscriptionProviderRename(document: unknown): ConfigMigrationTransformResult;
