import { type Platform } from "./protocol";
export declare function deviceName(host?: string): string;
/**
 * Whether omo generated this device name itself (#13651): a pre-#14044 `omo CLI on <host>` or `OmO Desktop on <host>`
 * label, the unnamed fallback, or the name built from the kernel hostname a Mac registered under before LocalHostName.
 * Any other name is one the person chose, and omo never replaces it.
 */
export declare function isGeneratedDeviceName(name: string): boolean;
export declare function devicePlatform(): Platform;
