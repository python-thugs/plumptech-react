import axios from "axios";
import {joinPath} from ".";
import {IAuto, WithId} from "../types";

export async function getAutomobiles() {
  const response = await axios.get<WithId<IAuto>[]>(joinPath());
  return response.data;
}
