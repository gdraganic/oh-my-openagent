import type { InstallConfig } from "./types";
export declare const NATIVE_EDITION_INSTALL_COMMAND: string;
export declare const NATIVE_EDITION_GUIDE_URL = "https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/guide/migrating-from-opencode.md";
export declare const NATIVE_EDITION_HINT_TITLE = "OmO Native (beta)";
export type NativeEditionHintPaint = {
    readonly command: (text: string) => string;
    readonly link: (text: string) => string;
};
export declare function shouldShowNativeEditionHint(config: Pick<InstallConfig, "hasNative" | "hasNativeDev">): boolean;
export declare function nativeEditionHintLines(paint?: NativeEditionHintPaint): readonly string[];
