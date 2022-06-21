import axios from "axios";
import {joinPath} from ".";
import {IMaintenance} from "../types";

export type ResponseAll = IMaintenance[];
export type ResponseNext = {next: IMaintenance};
export type ResponseLast = {last: IMaintenance};

export async function getMaintenances(
  id: number,
  config?: {next?: boolean; last?: boolean}
) {
  if (!id) {
    throw {error: true, message: "id should be provided!"};
  }
  const response = await axios.get<ResponseAll | ResponseLast | ResponseNext>(
    joinPath("maintenances"),
    {params: config}
  );
  return response.data;
}
