import { type MachineDevice } from "./protocol";
/**
 * #14032: whether `omo login` asks the service to replace this computer's earlier device. `--replace` agrees without a
 * prompt; an interactive terminal asks, defaulting to No; a script without the flag keeps the refusal and names the flag.
 */
export declare function decideReplace(options: {
    readonly replace: boolean;
    readonly interactive: boolean;
    readonly confirm: (message: string) => Promise<boolean>;
    readonly log: (line: string) => void;
}): (existing: MachineDevice) => Promise<boolean>;
