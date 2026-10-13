import { z } from "zod";
export declare const BrowserAutomationProviderSchema: z.ZodEnum<{
    "dev-browser": "dev-browser";
    external: "external";
    playwright: "playwright";
    "playwright-cli": "playwright-cli";
}>;
export declare const BrowserAutomationConfigSchema: z.ZodObject<{
    provider: z.ZodDefault<z.ZodEnum<{
        "dev-browser": "dev-browser";
        external: "external";
        playwright: "playwright";
        "playwright-cli": "playwright-cli";
    }>>;
    playwright_mcp_args: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type BrowserAutomationProvider = z.infer<typeof BrowserAutomationProviderSchema>;
export type BrowserAutomationConfig = z.infer<typeof BrowserAutomationConfigSchema>;
