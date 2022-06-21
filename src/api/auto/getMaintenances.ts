import axios from "axios";
import {joinPath} from ".";
import {convertMaintenanceDates, ResponseMaintenance} from "../maintenance";

type ResponseAll = ResponseMaintenance[];
type ResponseNext = {next: ResponseMaintenance};
type ResponseLast = {last: ResponseMaintenance};

export async function getMaintenances(
  id: number,
  config?: {next?: boolean; last?: boolean}
) {
  if (!id) {
    throw {error: true, message: "id should be provided!"};
  }
  const response = await axios.get<ResponseAll | ResponseLast | ResponseNext>(
    joinPath(id.toString(), "maintenances"),
    {params: config}
  );
  if (Object.hasOwn(response.data, "map")) {
    return (response.data as ResponseAll).map(convertMaintenanceDates);
  }
  return {
    last:
      (response.data as ResponseLast).last &&
      convertMaintenanceDates((response.data as ResponseLast).last),
    next:
      (response.data as ResponseNext).next &&
      convertMaintenanceDates((response.data as ResponseNext).next),
  };
}
