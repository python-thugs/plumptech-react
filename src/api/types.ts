export interface IEmployee {
  id: number;
  name: string;
  username: string;
  post: IPost;
}

export interface IPost {
  id: PostEnum;
  name: keyof typeof PostEnum;
}

export enum PostEnum {
  "Администратор" = 1,
  "Старший техник" = 2,
  "Автослесарь" = 3,
}

export type WithPassword<T> = T & {password: string};
export type WithId<T> = T & {id: number};

export interface IMaintenance {
  start: Date;
  deadline: Date;
  end: Date;
  auto: IAuto;
  status: IStatus;
}

export interface IAuto {
  licensePlate: string;
  garagePlate: string;
  manufacturer: string;
  model: string;
}

export interface IStatus {
  name: string;
}
