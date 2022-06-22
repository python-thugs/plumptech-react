import {joinPath as rootPath} from "..";
export {getAutomobiles} from "./getAutomobiles";
export {getMaintenances} from "./getMaintenances";
export {createAuto} from "./createAuto";
export {deleteAuto} from "./delete";

export function joinPath(...paths: string[]) {
  return rootPath("auto", ...paths);
}
