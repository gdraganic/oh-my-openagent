import { runSenpiInstaller } from "@oh-my-opencode/omo-senpi/install";
export type NativeDevInstallOptions = NonNullable<Parameters<typeof runSenpiInstaller>[0]>;
export type NativeDevInstallResult = Awaited<ReturnType<typeof runSenpiInstaller>>;
export declare function runNativeDevInstaller(options?: NativeDevInstallOptions): Promise<NativeDevInstallResult>;
