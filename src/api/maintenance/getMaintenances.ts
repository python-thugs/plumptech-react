import axios from "axios";
import {joinPath} from ".";

export async function getMaintenances() {
  const response = await axios.get(joinPath());
  return response.data;
}
