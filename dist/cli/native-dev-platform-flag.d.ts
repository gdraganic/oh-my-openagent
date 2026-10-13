import type { InstallPlatform } from "./types";
export declare const NATIVE_DEV_PLATFORM_ENV_FLAG = "OMO_ENABLE_NATIVE_DEV_PLATFORM";
export declare const LEGACY_NATIVE_DEV_PLATFORM_ENV_FLAG = "OMO_ENABLE_SENPI_PLATFORM";
export declare function isNativeDevPlatformEnabled(env?: NodeJS.ProcessEnv): boolean;
export declare function availableInstallPlatforms(env?: NodeJS.ProcessEnv): InstallPlatform[];
