import {joinPath as rootJoin} from "..";
import {WithId, IAuto, IStatus, IMaintenance} from "../types";
export {getMaintenances} from "./getMaintenances";
export {getJobs} from "./getJobs";

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

export const convertMaintenanceDates = (
  m: ResponseMaintenance
): IMaintenance => ({
  ...m,
  start: new Date(m.start),
  deadline: new Date(m.deadline),
  end: new Date(m.end),
});
