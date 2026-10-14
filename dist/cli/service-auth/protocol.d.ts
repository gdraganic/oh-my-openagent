import { z } from "zod";
export declare class SignInError extends Error {
    readonly retryable: boolean;
    readonly name = "SignInError";
    constructor(message: string, retryable?: boolean);
}
export declare class RequestFailure extends SignInError {
    readonly notSent: boolean;
    constructor(notSent: boolean);
}
export declare const platformSchema: z.ZodEnum<{
    linux: "linux";
    macos: "macos";
    windows: "windows";
}>;
export type Platform = z.infer<typeof platformSchema>;
export declare const tokenSchema: z.ZodObject<{
    accessToken: z.ZodString;
    accessTokenExpiresAt: z.ZodString;
    refreshToken: z.ZodString;
}, z.core.$strip>;
export declare const grantSchema: z.ZodObject<{
    accessToken: z.ZodString;
    accessTokenExpiresAt: z.ZodString;
    refreshToken: z.ZodString;
    device: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    offlineGrant: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const credentialSchema: z.ZodObject<{
    accessToken: z.ZodString;
    accessTokenExpiresAt: z.ZodString;
    refreshToken: z.ZodString;
    device: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    offlineGrant: z.ZodOptional<z.ZodString>;
    signingPrivateKey: z.ZodString;
    sealingPrivateKey: z.ZodString;
    refreshState: z.ZodOptional<z.ZodLiteral<"uncertain">>;
}, z.core.$strip>;
export type Credentials = z.infer<typeof credentialSchema>;
export declare const deviceCodeSchema: z.ZodObject<{
    deviceCode: z.ZodString;
    userCode: z.ZodString;
    matchingCode: z.ZodString;
    verificationUri: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>;
    expiresAt: z.ZodString;
    intervalSeconds: z.ZodNumber;
}, z.core.$strip>;
declare const limitSchema: z.ZodObject<{
    reason: z.ZodLiteral<"device_limit">;
    managementToken: z.ZodString;
    used: z.ZodNumber;
    limit: z.ZodNumber;
}, z.core.$strip>;
export declare const deviceListSchema: z.ZodObject<{
    devices: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        revokedAt: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ListedDevice = z.infer<typeof deviceListSchema>["devices"][number];
export type ChooseDevice = (devices: readonly ListedDevice[]) => Promise<string | null>;
export declare class ApiRefusal extends SignInError {
    #private;
    readonly status: number;
    readonly code: string;
    constructor(code: string, status: number, detail?: z.infer<typeof limitSchema>, retryAfter?: string | null);
    get detail(): {
        reason: "device_limit";
        managementToken: string;
        used: number;
        limit: number;
    } | undefined;
    retryDelay(now: number, fallback: number): number;
}
export declare function parseReply<T>(schema: z.ZodType<T>, value: unknown): T;
export declare function serviceOrigin(value: string): string;
export declare function requestApi(api: string, path: string, init: RequestInit, signal?: AbortSignal): Promise<unknown>;
export declare const jsonRequest: (body: unknown) => RequestInit;
export {};
