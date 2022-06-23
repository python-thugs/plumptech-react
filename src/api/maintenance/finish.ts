import axios from "axios";
import {joinPath} from ".";

export async function finish(id: number) {
  const response = await axios.post(joinPath(id.toString(), "finish"));
  return response.data;
}
