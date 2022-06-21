import {joinPath as rootJoin} from "..";
export {getMaintenances} from "./getMaintenances";

export function joinPath(...paths: string[]) {
  return rootJoin("maintenance", ...paths);
}
