import {joinPath as rootPath} from "..";

export function joinPath(...paths: string[]) {
  return rootPath("auto", ...paths);
}
