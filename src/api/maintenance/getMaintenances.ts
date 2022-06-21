import axios from "axios";
import {joinPath, ResponseMaintenance} from ".";
import {IMaintenance} from "../types";

export async function getMaintenances() {
  const response = await axios.get<ResponseMaintenance[]>(joinPath());
  return response.data.map<IMaintenance>(m => ({
    ...m,
    start: new Date(m.start),
    deadline: new Date(m.deadline),
    end: new Date(m.end),
  }));
}
