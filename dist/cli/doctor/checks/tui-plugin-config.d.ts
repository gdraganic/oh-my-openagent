import type { CheckResult } from "../framework/types";
interface ServerPluginInfo {
    registered: boolean;
    configPath: string | null;
    entry: string | null;
    packageExportsTui: boolean | null;
}
interface TuiPluginInfo {
    registered: boolean;
    configPath: string | null;
    exists: boolean;
    hasPackageTuiEntry: boolean;
    hasNamedTuiEntry: boolean;
    hasCanonicalNamedTuiEntry: boolean;
    managedEntryCount: number;
}
export declare function tuiPluginSpecName(entry: unknown): string | null;
export declare function isOurFilePluginEntry(entry: unknown): boolean;
export declare function isServerPluginEntry(entry: unknown): entry is string;
export declare function isTuiPluginEntry(entry: unknown): boolean;
export declare function isNamedTuiPluginEntry(entry: unknown): boolean;
/**
 * Every `tui.json` entry that belongs to this plugin, whatever spec it carries:
 * the bare package name, any tag or version spec, the legacy package name, the
 * `<pkg>/tui` subpath older installers wrote, our `file:` dev entries, and the
 * `file://.../(src|dist)/index.(ts|js)` source specs `addPluginToOpenCodeConfig`
 * already treats as ours — in string or `[name, options]` tuple form. The
 * installer replaces all of them with the single entry it writes.
 */
export declare function isOmoManagedTuiEntry(entry: unknown): boolean;
export declare function detectServerPluginRegistration(): ServerPluginInfo;
export declare function detectTuiPluginRegistration(): TuiPluginInfo;
export declare function checkTuiPluginConfig(): Promise<CheckResult>;
export {};
