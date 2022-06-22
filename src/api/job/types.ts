import {WithId} from "../types";

export interface IJob {
  name: string;
  description?: string;
}

export type JobWithId = WithId<IJob>;
