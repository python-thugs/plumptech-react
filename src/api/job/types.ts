import {WithId} from "../types";

export interface IJob {
  name: string;
  description?: string;
}

export type JobWithId = WithId<IJob>;
export type JobWithMaterials = IJob & {materials?: IMaterial[]};
export type JobWithMaterialsWithId = IJob & {materials?: MaterialWithId[]};

export interface IMaterial {
  code: string;
  name: string;
  price: number;
}

export type MaterialWithId = WithId<IMaterial>;
