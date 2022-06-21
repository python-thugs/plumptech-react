import {joinPath as rootJoin} from "..";
import {WithId} from "../types";
export {getMaintenances} from "./getMaintenances";

export function joinPath(...paths: string[]) {
  return rootJoin("maintenance", ...paths);
}

export type ResponseMaintenance = WithId<{
  auto: number;
  deadline: string;
  end: string;
  start: string;
  status: number;
}>;
