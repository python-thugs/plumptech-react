import {joinPath as rootPath} from "..";
export {getAutomobiles} from "./getAutomobiles";
export {getMaintenances} from "./getMaintenances";

export function joinPath(...paths: string[]) {
  return rootPath("auto", ...paths);
}
