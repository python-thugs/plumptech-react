import axios from "axios";
import {joinPath} from ".";
import {JobWithId} from "./types";

export async function checkJob(id: number) {
  const response = await axios.post<JobWithId>(
    joinPath(id.toString(), "check")
  );
  return response.data;
}
