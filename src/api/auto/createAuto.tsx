import axios from "axios";
import {joinPath} from ".";
import {IAuto, WithId} from "../types";

export async function createAuto(data: IAuto) {
  const response = await axios.post<WithId<IAuto>>(joinPath(), data);
  return response.data;
}
