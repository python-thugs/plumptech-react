import {joinPath as JP} from "..";
export * from "./checkJob";

export const joinPath = (...args: string[]) => JP("job", ...args);
