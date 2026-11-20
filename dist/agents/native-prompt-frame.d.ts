import { z } from "zod";
export declare const NativePromptContext: z.ZodObject<{
    model: z.ZodString;
    tools: z.ZodArray<z.ZodString>;
    toolSnippets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    toolPermissions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        pattern: z.ZodString;
        permission: z.ZodEnum<{
            allow: "allow";
            ask: "ask";
            deny: "deny";
        }>;
        scope: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    restriction: z.ZodOptional<z.ZodLiteral<"hephaestus">>;
    useTaskSystem: z.ZodOptional<z.ZodBoolean>;
    refusalRule: z.ZodOptional<z.ZodLiteral<true>>;
    role: z.ZodOptional<z.ZodString>;
    standalone: z.ZodOptional<z.ZodLiteral<true>>;
}, z.core.$strip>;
export type NativePromptContext = z.infer<typeof NativePromptContext>;
/** A rendered agent prompt: the frame, and the role text that follows it ("" when nothing does). */
export type NativePromptParts = {
    readonly frame: string;
    readonly role: string;
};
export declare function frameNativePrompt(body: string, context: NativePromptContext): string;
export declare function replaceNativePromptFrames(system: string[], model: string | undefined, render: (context: NativePromptContext) => NativePromptParts | undefined, refreshTools?: boolean): void;
