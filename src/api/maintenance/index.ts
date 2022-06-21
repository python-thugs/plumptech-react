import {joinPath as rootJoin} from "..";
import {WithId, IAuto, IStatus} from "../types";
export {getMaintenances} from "./getMaintenances";

export function joinPath(...paths: string[]) {
  return rootJoin("maintenance", ...paths);
}

export type ResponseMaintenance = WithId<{
  deadline: string;
  end: string;
  start: string;
  auto: IAuto;
  status: IStatus;
}>;
