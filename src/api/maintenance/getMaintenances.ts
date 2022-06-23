import axios from "axios";
import {joinPath, ResponseMaintenance} from ".";
import {MaintenanceWithId, MaintenanceWithJobs, WithId} from "../types";

export async function getMaintenances(
  withJobs: boolean = false,
  onlyFinished: boolean = false
) {
  const response = await axios.get<ResponseMaintenance[]>(joinPath(), {
    params: {
      with: withJobs ? "jobs" : undefined,
      finished: onlyFinished,
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
