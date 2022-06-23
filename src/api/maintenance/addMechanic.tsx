import axios from "axios";
import {joinPath} from ".";

type Arg = {maintenanceId: number; mechanicId: number};

export async function addMechanic(arg: Arg) {
  const response = await axios.post(
    joinPath(arg.maintenanceId.toString(), "mechanic"),
    {mechanic: arg.mechanicId}
  );
  return response.data;
}
