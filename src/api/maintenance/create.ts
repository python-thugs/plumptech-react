import axios, {AxiosError} from "axios";
import {joinPath} from ".";
import {IMaintenance} from "../types";

type MaintenanceType = Omit<IMaintenance, "auto" | "status"> & {
  auto: number;
  status: number;
};

export async function createMaintenance(maintenance: MaintenanceType) {
  try {
    const response = await axios.post(joinPath(), maintenance);
    return response.data;
  } catch (e) {
    console.error("-> Error: ", (e as AxiosError).response);
    return (e as AxiosError).response;
  }
}
