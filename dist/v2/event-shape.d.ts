export type V1Event = {
    type: string;
    properties: Record<string, unknown>;
};
export declare function toV1Event(event: unknown): V1Event;
