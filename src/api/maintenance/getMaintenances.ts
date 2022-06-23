import axios from "axios";
import {joinPath, ResponseMaintenance} from ".";
import {MaintenanceWithId, MaintenanceWithJobs, WithId} from "../types";

type GetMaintenancesParams = Partial<{
  withJobs: boolean;
  onlyFinished: boolean;
  from: Date;
  to: Date;
}>;

export async function getMaintenances({
  from,
  to,
  withJobs,
  onlyFinished,
}: GetMaintenancesParams = {}) {
  const response = await axios.get<ResponseMaintenance[]>(joinPath(), {
    params: {
      with: withJobs ? "jobs" : undefined,
      finished: onlyFinished,
      from,
      to,
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
