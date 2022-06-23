import axios from "axios";
import {joinPath} from ".";
import {JobWithMaterialsWithId, WithId} from "../types";

export async function getJobs(id: number) {
  const response = await axios.get<WithId<JobWithMaterialsWithId>[]>(
    joinPath(id.toString(), "jobs")
  );
  return response.data;
}
