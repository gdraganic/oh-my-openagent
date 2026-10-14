export type Platform = "darwin" | "linux" | "win32" | "unsupported";
export declare function detectPlatform(detected?: string, env?: Readonly<Record<string, string | undefined>>): Platform;
export declare function getDefaultSoundPath(platform: Platform): string;
