import axios from "axios";
import {joinPath} from ".";
import {IAuto} from "../types";

export async function getAutomobiles() {
  const response = await axios.get<IAuto[]>(joinPath());
  return response.data;
}
