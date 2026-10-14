declare const fakeStoreUrl: string | undefined;
declare const get: () => Promise<string | null>;
declare const set: ({ value }: {
    readonly value: string;
}) => Promise<void>;
declare const remove: () => Promise<boolean>;
declare const failure: string | undefined;
