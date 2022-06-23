import axios from "axios";
import {joinPath, ResponseMaintenance} from ".";
import {MaintenanceWithId, MaintenanceWithJobs, WithId} from "../types";

type GetMaintenancesParams = Partial<{
  withParam: Array<"jobs" | "mechanic">;
  onlyFinished: boolean;
  from: Date;
  to: Date;
  available: boolean;
  mechanic: number;
}>;

export async function getMaintenances({
  from,
  to,
  withParam,
  onlyFinished,
  available,
  mechanic,
}: GetMaintenancesParams = {}) {
  const response = await axios.get<ResponseMaintenance[]>(joinPath(), {
    params: {
      with: withParam && withParam.join(","),
      finished: onlyFinished,
      from,
      to,
      available,
      mechanic,
    },
  });
  return response.data.map<MaintenanceWithId | WithId<MaintenanceWithJobs>>(
    m => ({
      ...m,
      start: new Date(m.start),
      deadline: new Date(m.deadline),
      end: new Date(m.end),
    })
  );
}
