export interface IEmployee {
  id: number;
  name: string;
  username: string;
  type: PostEnum;
}

export enum PostEnum {
  ADMIN = "Администратор",
  TECHNICIAN = "Старший техник",
  MECHANIC = "Автослесарь",
}
