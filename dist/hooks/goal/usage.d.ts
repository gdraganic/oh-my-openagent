/** `goalStartedAt` is in seconds, like the goal record; message times are milliseconds. */
export declare function goalUsageFromMessages(messages: readonly unknown[], goalStartedAt: number): {
    tokensUsed: number;
    timeUsedSeconds: number;
};
