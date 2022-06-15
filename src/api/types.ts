export interface IEmployee {
  id: number;
  name: string;
  username: string;
  post: PostEnum;
}

export enum PostEnum {
  "Администратор" = 1,
  "Старший техник" = 2,
  "Автослесарь" = 3,
}
